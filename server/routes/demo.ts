import { Router } from "express";
import { DemoRequest, IDemoRequest } from "../../shared/schema";

const router = Router();

// Create demo request
router.post("/", async (req, res) => {
  try {
    const demoRequestData = {
      ...req.body,
      status: "new"
    };

    const newDemoRequest = new DemoRequest(demoRequestData);
    const savedDemoRequest = await newDemoRequest.save();

    res.status(201).json(savedDemoRequest);
  } catch (error) {
    console.error("Error creating demo request:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
});

// Get all demo requests (admin only)
router.get("/", async (req, res) => {
  try {
    const requests = await DemoRequest.find()
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Error fetching demo requests:", error);
    res.status(500).json({ error: "Failed to fetch demo requests" });
  }
});

// Get demo request by ID
router.get("/:id", async (req, res) => {
  try {
    const request = await DemoRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Demo request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching demo request:", error);
    res.status(500).json({ error: "Failed to fetch demo request" });
  }
});

// Update demo request status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["new", "contacted", "demo_scheduled", "demo_completed", "follow_up", "closed"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedRequest = await DemoRequest.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Demo request not found" });
    }

    res.json(updatedRequest);
  } catch (error) {
    console.error("Error updating demo request:", error);
    res.status(500).json({ error: "Failed to update demo request" });
  }
});

export default router;