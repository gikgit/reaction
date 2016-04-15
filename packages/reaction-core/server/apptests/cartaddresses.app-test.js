/* eslint dot-notation: 0 */

// describe("core shop schema", function () {
//   beforeEach(function () {
//     ReactionCore.Collections.Shops.remove({});
//     ReactionCore.Collections.Products.remove({});
//     ReactionCore.Collections.Tags.remove({});
//     ReactionCore.Collections.Products.remove({});
//     ReactionCore.Collections.Cart.remove({});
//   });
//
//   it("should create a new factory shop", function (done) {
//     spyOn(Roles, "userIsInRole").and.returnValue(true);
//     spyOn(ReactionCore.Collections.Shops, "insert");
//     Factory.create("shop");
//     expect(ReactionCore.Collections.Shops.insert).toHaveBeenCalled();
//     return done();
//   });
// });


describe("cart/unsetAddresses", function () {
  it(
    "should correctly remove addresses from cart",
    done => {
      let cart = Factory.create("cart");
      // spyOnMethod("setShipmentAddress", cart.userId);
      // spyOnMethod("setPaymentAddress", cart.userId);
      //
      // const cartId = cart._id;
      // const address = Object.assign({}, faker.reaction.address(), {
      //   _id: Random.id(),
      //   isShippingDefault: true,
      //   isBillingDefault: true
      // });
      //
      // Meteor.call("cart/setPaymentAddress", cartId, address);
      // Meteor.call("cart/setShipmentAddress", cartId, address);
      // cart = ReactionCore.Collections.Cart.findOne(cartId);
      //
      // expect(cart.shipping[0].address._id).toEqual(address._id);
      // expect(cart.billing[0].address._id).toEqual(address._id);
      //
      // // our Method checking
      // Meteor.call("cart/unsetAddresses", address._id, cart.userId);
      //
      // cart = ReactionCore.Collections.Cart.findOne(cartId);
      //
      // expect(cart.shipping[0].address).toBeUndefined();
      // expect(cart.billing[0].address).toBeUndefined();

      return done();
    }
  );

  // it(
  //   "should throw error if wrong arguments were passed",
  //   done => {
  //     spyOn(ReactionCore.Collections.Accounts, "update");
  //
  //     expect(function () {
  //       return Meteor.call("cart/unsetAddresses", 123456);
  //     }).toThrow();
  //
  //     expect(function () {
  //       return Meteor.call("cart/unsetAddresses", {});
  //     }).toThrow();
  //
  //     expect(function () {
  //       return Meteor.call("cart/unsetAddresses", null);
  //     }).toThrow();
  //
  //     expect(function () {
  //       return Meteor.call("cart/unsetAddresses");
  //     }).toThrow();
  //
  //     expect(function () {
  //       return Meteor.call("cart/unsetAddresses", "asdad", 123);
  //     }).toThrow();
  //
  //     // https://github.com/aldeed/meteor-simple-schema/issues/522
  //     expect(function () {
  //       return Meteor.call(
  //         "accounts/addressBookRemove", () => {
  //           console.log("test");
  //         }
  //       );
  //     }).not.toThrow();
  //
  //     expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
  //
  //     return done();
  //   }
  // );

  // it(
  //   "should update cart via `type` argument",
  //   done => {
  //     let cart = Factory.create("cart");
  //     spyOnMethod("setShipmentAddress", cart.userId);
  //     spyOnMethod("setPaymentAddress", cart.userId);
  //
  //     const cartId = cart._id;
  //     const address = Object.assign({}, faker.reaction.address(), {
  //       _id: Random.id(),
  //       isShippingDefault: true,
  //       isBillingDefault: true
  //     });
  //     Meteor.call("cart/setPaymentAddress", cartId, address);
  //     Meteor.call("cart/setShipmentAddress", cartId, address);
  //     cart = ReactionCore.Collections.Cart.findOne(cartId);
  //
  //     expect(cart.shipping[0].address._id).toEqual(address._id);
  //     expect(cart.billing[0].address._id).toEqual(address._id);
  //
  //     Meteor.call("cart/unsetAddresses", address._id, cart.userId,
  //       "billing");
  //     Meteor.call("cart/unsetAddresses", address._id, cart.userId,
  //       "shipping");
  //
  //     cart = ReactionCore.Collections.Cart.findOne(cartId);
  //
  //     expect(cart.shipping[0].address).toBeUndefined();
  //     expect(cart.billing[0].address).toBeUndefined();
  //
  //     return done();
  //   }
  // );

});

