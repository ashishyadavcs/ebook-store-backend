import { Router } from "express";
import { EbookController } from "../controllers/ebook.js";
import { authenticate } from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";
const router = Router();

const ebookController = new EbookController();

router.get("/ebooks", (req, res, next) => {
    ebookController.getEbooks(req, res, next);
});
router.post("/ebook", authenticate, upload.any(), (req, res, next) => {
    ebookController.saveEbook(req, res, next);
});
router.get("/ebooks/:id", (req, res, next) => {
    ebookController.getEbooks(req, res, next);
});
router.patch("/ebook/:id", authenticate, upload.any(), (req, res, next) => {
    ebookController.updateEbook(req, res, next);
});
router.delete("/ebooks/:id", authenticate, (req, res, next) => {
    ebookController.deleteEbook(req, res, next);
});
export default router;
