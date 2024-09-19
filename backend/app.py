# Importing flask module in the project is mandatory
from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import docx

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
CORS(app)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/upload-cv', methods=["POST"])
def handle_file_upload():
    if request.method == "POST":
        # Access the request body
        f = request.files["cv"]

        # Outputs a byte string which is essentially raw bytes
        file_content_bytes_string = f.read()

        try:
            # Create a document
            # BytesIO > Creates an in-memory stream (file=like object) from the bytes which docx.Document can read as if it were from an actual file  
            # According to docx documentation the argument can a path to .docx or a file like object (a bytes object is file like)
            document = docx.Document(io.BytesIO(file_content_bytes_string))

            # View the paragraphs in the document
            document_paragraphs = document.paragraphs

            # Store the text for each paragraph in a list
            para_list = [para.text for para in document_paragraphs]
        except:
            raise Exception("Error converting in-memory bytes object into docx")

        return jsonify({"cv_details": "\n".join(para_list)}), 200

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server
    app.run()