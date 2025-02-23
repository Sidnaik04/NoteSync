import Note from "../model/Note.js";

export const createNote = async (req, res) => {
    try {
        const note = new Note({ ...req.body, userId: req.user.id });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: "Error creating note" });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes" });
    }
};