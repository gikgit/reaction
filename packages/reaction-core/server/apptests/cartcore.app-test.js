/* eslint dot-notation: 0 */

import { Meteor } from "meteor/meteor";


cleanDb = function (opts) {
  console.log("Running cleanDb");
  let options = opts || {};
  let excludedCollections = ["system.indexes"];
  if (options.excludedCollections) {
    excludedCollections = excludedCollections.concat(options.excludedCollections);
  }

  const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  const getCollections = Meteor.wrapAsync(db.collections, db);
  let collections = getCollections();
  let appCollections = _.reject(collections, function (col) {
    return col.collectionName.indexOf('velocity') === 0 ||
      excludedCollections.indexOf(col.collectionName) !== -1;
  });

  _.each(appCollections, function (appCollection) {
    var remove = Meteor.wrapAsync(appCollection.remove, appCollection);
    remove({});
  });
};


describe("cart methods", function () {
  beforeEach(() => {
    // cleanDb();

  });

  let user = Factory.create("user");
  const shop = faker.reaction.shops.getShop();
  let userId = user._id;
  // Required for creating a cart
  let originals = {};
  originals["mergeCart"] = Meteor.server
    .method_handlers["cart/mergeCart"];
  originals["copyCartToOrder"] = Meteor.server
    .method_handlers["cart/copyCartToOrder"];
  originals["addToCart"] = Meteor.server
    .method_handlers["cart/addToCart"];
  originals["setShipmentAddress"] = Meteor.server
    .method_handlers["cart/setShipmentAddress"];
  originals["setPaymentAddress"] = Meteor.server
    .method_handlers["cart/setPaymentAddress"];

  const sessionId = ReactionCore.sessionId = Random.id();

  function spyOnMethod(method, id) {
    return spyOn(Meteor.server.method_handlers, `cart/${method}`).and.callFake(
      function () {
        this.userId = id;
        return originals[method].apply(this, arguments);
      }
    );
  }

  afterAll(() => {
    Meteor.users.remove({});
  });


  describe("cart/addToCart", function () {
    const quantity = 1;
    let product;
    let productId;
    let variantId;

    beforeAll(() => {
      // this is needed for `inventory/register`
      spyOn(ReactionCore, "hasPermission").and.returnValue(true);
      product = faker.reaction.products.add();
      productId = product._id;
      variantId = ReactionCore.Collections.Products.findOne({
        ancestors: [productId]
      })._id;
    });

    beforeEach(function () {
      console.log("beforeEach");
      ReactionCore.Collections.Cart.direct.remove({});
    });

    it(
      "should add item to cart",
      function (done) {
        let cart = Factory.create("cart");
        let items = cart.items.length;
        spyOnMethod("addToCart", cart.userId);
        Meteor.call("cart/addToCart", productId, variantId, quantity);
        cart = ReactionCore.Collections.Cart.findOne(cart._id);

        expect(cart.items.length).toEqual(items + 1);
        expect(cart.items[cart.items.length - 1].productId).toEqual(productId);

        done();
      }
    );

    it(
      "should throw error an exception if user doesn't have a cart",
      done => {
        const  userWithoutCart = Factory.create("user");
        spyOnMethod("addToCart", userWithoutCart._id);
        expect(() => {
          return Meteor.call("cart/addToCart", productId, variantId,
            quantity);
        }).toThrow(new Meteor.Error(404, "Cart not found",
          "Cart not found for user with such id"));

        return done();
      }
    );

    it(
      "should merge all items of same variant in cart",
      function (done) {
        spyOn(ReactionCore, "shopIdAutoValue").and.returnValue(shop._id);
        spyOn(ReactionCore, "getShopId").and.returnValue(shop._id);
        spyOnMethod("addToCart", userId);
        const cartId = Meteor.call("cart/createCart", userId, sessionId);

        Meteor.call("cart/addToCart", productId, variantId, quantity);
        // add a second item of same variant
        Meteor.call("cart/addToCart", productId, variantId, quantity);
        let cart = ReactionCore.Collections.Cart.findOne(cartId);

        expect(cart.items.length).toEqual(1);
        expect(cart.items[0].quantity).toEqual(2);

        return done();
      }
    );


    it(
      "should throw error an exception if product doesn't exists",
      done => {
        const  cart = Factory.create("cart");
        spyOnMethod("addToCart", cart.userId);
        expect(() => {
          return Meteor.call("cart/addToCart", "fakeProductId", variantId,
            quantity);
        }).toThrow(new Meteor.Error(404, "Product not found",
          "Product with such id was not found!"));

        return done();
      }
    );
  });
});
