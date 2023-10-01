const Event = require("../models/model").events;

function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return timestamp;
}

const events = [
  "REGISTERED",
  "SUBMIT_BASELINE_SURVEY",
  "ENTERED_CSTRETCH",
  "PRESSED_START",
  "PRESSED_STOP",
  "PRESSED_LOGOUT",
  "CHANGED_REMINDER_INTERVAL",
  "PRESSED_CASE_OVER",
  "FIRED_ALARM",
  "SNOOZE",
  "PRESSED_FINISHED",
  "PRESSED_GO",
  "ENTERED_PENDING_SURVEYS",
  "SUBMIT_ENDOFDAY_SURVEY",
  "DONE_STRETCHING",
  "RESET",
  "RESUMED_FROM_STOP",
  "AUTO_DONE_STRETCHING",
  "DONE_STRETCHING_STANDED",
  "AUTO_DONE_STRETCHING_SEATED",
  "AUTO_DONE_STRETCHING_STANDED",
  "DONE_STRETCHING_SEATED",
];

const createEvent = async (req, res) => {
  try {
    if (events.includes(req.body.event_type)) {
      const timestamp = getCurrentTimestamp();
      let data = { ...req.body, timestamp };

      const event = await Event.create(data);
      return res.status(200).json({ event, isSuccess: true });
    } else {
      return res.status(400).json({
        message:
          "This event is not an available event. Check the possible events endpoint for available events.",
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event_id = req.query.event_id;
    if (!event_id)
      return res.status(400).json({
        message: "Event ID parameter not specified. ",
        isSuccess: false,
      });

    const event = await Event.findOne({ where: { id: event_id } });
    if (event) {
      await Event.destroy({ where: { id: event_id } });
      return res.status(200).json({
        message: `Event with id '${id}' has been deleted.`,
        isSuccess: true,
      });
    } else {
      return res.status(400).json({
        message: `Event with id '${id}' does not exist.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const viewEventDetails = async (req, res) => {
  try {
    if (!req.query.event_id)
      return res.status(400).json({
        message: "Event ID parameter not specified. ",
        isSuccess: false,
      });
    const event = await Event.findOne({ where: { id: req.query.event_id } });
    if (event) {
      return res.status(200).json({ event, isSuccess: true });
    } else {
      return res
        .status(400)
        .json({ message: "Event not found.", isSuccess: false });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ where: { id: req.query.event_id } });
    if (event) {
      await Event.update(req.body, { where: { id: req.query.event_id } });
      return res
        .status(200)
        .json({ message: `Event has been updated. `, isSuccess: true });
    } else {
      return res.status(400).json({
        message: `Event with id ${req.query.event_id} does not exist.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const listEvents = async (req, res) => {
  try {
    const page_no = Number(req.query.page_no);
    const no_of_events = Number(req.query.no_of_events);
    const offset = (page_no - 1) * no_of_events;
    const totalNoOfEvents = await Event.count();

    if (isNaN(page_no) || page_no <= 0) {
      return res.status(400).json({
        message:
          "Invalid page number parameter. It should be a number and shouldn't be less than one.",
        isSuccess: false,
      });
    }
    const events = await Event.findAll({
      offset,
      limit: no_of_events,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ events, totalNoOfEvents, isSuccess: true });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const getPossibleEvents = async (req, res) => {
  try {
    return res.status(200).json({ events, isSuccess: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", isSuccess: false });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  getPossibleEvents,
  listEvents,
  updateEvent,
  viewEventDetails,
};
