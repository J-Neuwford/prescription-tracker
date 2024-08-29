# Prescription Tracker (WIP)

A mobile app to keep track of prescriptions and schedule reminders to take medication.

This is an exploration into technologies I have not used before. I am using **TypeScript** + **React Native** for the frontend, with **Python** + **Quart** on the backend.
I am also using **SQLite** whilst developing locally, but am using **PostgreSQL** in production.

## MVP

#### Part 1:

As a user, I can:

- navigate between a home screen and prescriptions screen. ✅
- add prescriptions. ✅
- view active prescriptions. ✅
- edit and delete active prescriptions. ✅

// Tech notes: Simple CRUD app to learn the ropes of the new tech. Get the backend deployed and accepting calls from the frontend. Implement a simple, clean UI that has clear flows.

#### Part 2:

As a user, I can:

- set up reminders for when to take my medication.
- set up reminders to reorder repeat prescriptions.
- keep track of how much of a prescription I have left.

// Tech notes: I will need to revisit schemas for reminders and scheduling.

## TODO Frontend

- extract api requests ✅
- home screen ✅
- navigation via state ✅
- add prescription screen ✅
- safe area view ✅
- selected prescription, edit and delete icons
- colours file
- add setup instructions to README
- add custom button component
- split list component
- refactor flatlist to use header

## TODO Backend

- add layers ✅
- add setup instructions to README
