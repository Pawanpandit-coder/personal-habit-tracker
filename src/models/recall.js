import mongoose from "mongoose";

const recallSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  content: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
}, {
  timestamps: true
});

const Recall = mongoose.models.Recall || mongoose.model("Recall", recallSchema);
export default Recall;
