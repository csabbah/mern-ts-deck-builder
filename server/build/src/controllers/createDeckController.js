"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeckController = void 0;
const Deck_1 = __importDefault(require("../models/Deck"));
function createDeckController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.body.title;
        // 2 Ways to create a model:
        // First method
        //   const newDeck = new Deck({ title: "My awesome deck" });
        //   const createdDeck = await newDeck.save(); // Save it to the DB
        // Second method
        const newDeck = yield Deck_1.default.create({ title });
        res.json(newDeck);
    });
}
exports.createDeckController = createDeckController;
