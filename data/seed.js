const mongoose = require("mongoose");
const Question = require("../models/question.js");
const connectDB = require("../db.js"); 

const seedQuestions = async () => {
    await connectDB();
    await Question.deleteMany({});

    const questions = [
        {
            text: "How are you feeling right now?",
            options: [
                { text: "Happy", points: 1 },
                { text: "Okay/Neutral", points: 2 },
                { text: "Sad", points: 4 },
                { text: "Angry", points: 6 },
                { text: "Anxious", points: 7 },
                { text: "Hopeless", points: 7 },
                { text: "Numb", points: 5 },
                { text: "Confused", points: 6 }
            ]
        },
        {
            text: "How has your mood been in the past week?",
            options: [
                { text: "Mostly positive", points: 1 },
                { text: "Mixed (ups and downs)", points: 6 },
                { text: "Mostly negative", points: 8 },
                { text: "Very low/depressed", points: 9}
            ]
        },
        {
            text:"How have your sleep habits been?",
            options:[
                {text:"I sleep well and wake up refreshed",points:1},
                {text:"I struggle to fall asleep",points:5},
                {text:" I wake up multiple times at night",points:6},
                {text:" I sleep too much but still feel tired",points:7},
                {text:"I barely get any sleep",points:8}
            ]
        },
        {
            text:"How is your energy level throughout the day?",
            options:[
                {text:"High Energy!",points:1},
                {text:"Moderate energy",points:3},
                {text:"Low energy",points:5},
                {text:"Exhausted most of the time",points:7}
            ]
        },
        {
            text:" How have your eating habits been lately?",
            options:[
                {text:"I eat balanced meals regularly",points:1},
                {text:"I skip meals often",points:5},
                {text:"I overeat or binge eat",points:6},
                {text:" No appetite/Forced to eat",points:6},
                {text:"Relying on junk food or sugary drinks",points:5}
            ]
        },
        {
            text:"How often do you engage in physical activity?",
            options:[
                {text:"Daily",points:1},
                {text:" A few times a week",points:3},
                {text:"Rarely",points:6},
                {text:"Not at all",points:8},
            ]
        },
        {
            text:"How is your social interaction lately?",
            options:[
                {text:"I regularly talk to friends/family",points:1},
                {text:"I occasionally check in with people",points:4},
                {text:"I’ve been avoiding socializing",points:7},
                {text:" I feel isolated and alone",points:9},
            ]
        },
        {
            text:" Have you noticed an increase in negative thoughts or self-criticism?",
            options:[
                {text:"Rarely or never",points:1},
                {text:"Sometimes",points:5},
                {text:"Often",points:7},
                {text:"Constantly",points:9}
            ]
        },
        {
            text:"How well are you managing stress?",
            options:[
                {text:"I handle stress well",points:1},
                {text:"I struggle but manage",points:4},
                {text:"I feel overwhelmed often",points:7},
                {text:"I can’t handle stress at all",points:9},
            ]
        },
        {
            text:"Do you experience sudden episodes of panic or fear?",
            options:[
                {text:"Never",points:1},
                {text:"Rarely",points:3},
                {text:"Sometimes",points:5},
                {text:"Often",points:7},
                {text:"Always",points:9}
            ]
        },
        {
            text:"Do you struggle to find the energy to do daily tasks?",
            options:[
                {text:"Never",points:1},
                {text:"Rarely",points:3},
                {text:"Sometimes",points:5},
                {text:"Often",points:7},
                {text:"Always",points:9}
            ]
        },
        {
            text:"Do you feel like your mind is foggy or forgetful?",
            options:[
                {text:"Never",points:1},
                {text:"Rarely",points:3},
                {text:"Sometimes",points:5},
                {text:"Often",points:7},
                {text:"Always",points:9}
            ]
        },
        {
            text:"Have you noticed any physical symptoms linked to your mental health?",
            options:[
                {text:"No physical symptoms",points:1},
                {text:"Headache",points:3},
                {text:"Muscle tension or body aches",points:5},
                {text:"Digestive issues",points:6},
                {text:"Shortness of breath or chest tightness",points:6},
                {text:"Heart palpitations or irregular heartbeat",points:9},
                {text:"Frequent illness or weakened immune system",points:9}
            ]
        }
    ];

    await Question.insertMany(questions);
    console.log("Questions seeded successfully");
    mongoose.connection.close();
};

seedQuestions();
