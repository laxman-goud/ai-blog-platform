import multer from 'multer'

/**
 * Multer configuration
 * Handles multipart/form-data for image uploads
 *
 * Storage is kept empty because:
 * - Files are temporarily stored
 * - Image is uploaded to ImageKit
 * - Local file is not persisted
 */
const upload = multer({
    storage: multer.diskStorage({})
})

export default upload