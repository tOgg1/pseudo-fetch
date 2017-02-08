
# Version 0.3.1
  - Made Response properly set statusMessage when status is set.
  - Made Response/Request#json resolve with an empty object on a non-truthy body.
  - Added a plethora of tests.

# Version 0.3.0 (First change-tracked version)
  - Made include/exclude receive request/response parameters instead of url/config.
  - Fixed a bug where a 200 status never could be returned from an include/exclude
  - Fixed a bug where parameters were not passed on to the request constructor
  - Implemented a better Headers init parser.
    - Headers can now parse a Headers-instance, and two different Object-formats.
