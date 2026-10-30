# Lab 01 - Issue Log

## Issue 1
File: receipt.ts
Line: 17
Error: TS1005 - ':' expected
Explanation: The object on line 17 uses = instead of : to separate property names from their values.
Suggested Fix:  object properties should use colons to separate names from values.
Status: Fixed

## Issue 2
File: receipt.ts
Line: 49
Error: TS1002 - Unterminated string literal
Explanation: The string on line 49 has mismatched quotation marks, so TypeScript cannot read it correctly.
Suggested Fix:  the receipt output needs matching quotation marks or backticks and correct ${} formatting.
Status: Fixed
