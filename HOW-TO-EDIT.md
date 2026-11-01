# How to update your website, Gloria

You never need to touch code. Your menu lives in a Google Sheet.

## 1. Make the menu sheet (one time)
1. Go to sheets.google.com and create a new sheet.
2. In row 1, type these headers, one per column: name | price | description | photo_url | available
3. Add one cookie per row. Example: Marshmallow Treat | $5 | Soft, gooey marshmallow cookie | (photo link) | yes
   - available: yes = shown, no = shown as "Sold out for now", hide = not shown.
   - price: leave blank and the site shows "Ask for price".
   - photo_url: leave blank for the kraft "Be Still & Rise" placeholder.

## 2. Adding photos
Easiest: upload the photo somewhere that gives a direct public image link (for example, Imgur, or Google Drive set to "Anyone with the link", using the link format https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000). Paste that link in the photo_url column.

## 3. Connect the sheet to the site (one time)
1. In the sheet: File > Share > Publish to web.
2. Choose the menu tab and "Comma-separated values (.csv)", then Publish.
3. Copy the link and paste it into config.js between the quotes on the SHEET_CSV_URL line (Eli can do this for you).

After that, any change you make in the sheet shows on the website within a few minutes. Just refresh.

## Order form
The Order buttons open your existing Google Form (GOOGLE_FORM_URL in config.js). To use a different form, paste its link there. If it is left empty, the buttons open your Instagram instead.
