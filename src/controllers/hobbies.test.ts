const mockingoose = require("mockingoose");

import ctrl from "./hobbies";
import User from "../models/user";
import Hobby from "../models/hobby";

describe("hobbies controller", () => {
  it("findsAll", async () => {
    const docs = [
      {
        name: "Mining Monero",
        user: {
          name: "Gianni",
        },
      },
      {
        name: "Walking",
        user: {
          name: "Churchill",
        },
      },
    ];
    mockingoose(Hobby).toReturn(docs, "find");

    const hobbies = await ctrl.hobbies.findAll();

    expect(hobbies.length).toBe(2);
  });

  it("findsOne", async () => {
    const doc = {
      _id: "6107eb8616142616843be38c",
      name: "Mining Monero",
      user: {
        name: "Gianni",
      },
    };
    mockingoose(Hobby).toReturn(doc, "findOne");

    const hobby = await ctrl.hobbies.findOne({
      _id: "6107eb8616142616843be38c",
    });

    expect(hobby._id == doc._id).toBe(true);
    expect(hobby.name == doc.name).toBe(true);
  });

  it("findsAll throws error", async () => {
    mockingoose(Hobby).toReturn(new Error('DB error'), "find");

    try {
        const hobbies = await ctrl.hobbies.findAll();
    } catch (err) {
        expect(err.message).toBe('DB error')
    }

  });

});
