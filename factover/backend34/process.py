import mimetypes, os
# from geminiVision import caption
# from geminiAudio import captionAudio
from main import checkAllClaims

def preprocessor(input_data):
    if isinstance(input_data, str):
        
            return input_data
    else:
        return "Invalid input type"

def processor(*args):
    query = ""
    for arg in args:
        query += preprocessor(arg)
    return checkAllClaims(query)