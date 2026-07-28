import io

# Try importing PyMuPDF (fitz) first, fallback to pypdf
try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None


def extract_text(file) -> str:
    """
    Extract text from a PDF file using PyMuPDF (fitz) or pypdf.
    `file` can be a file-like object or bytes.
    """
    text = ""

    # Read bytes if necessary
    if hasattr(file, "read"):
        file_bytes = file.read()
        if hasattr(file, "seek"):
            file.seek(0)
    elif isinstance(file, bytes):
        file_bytes = file
    else:
        file_bytes = None

    # Method 1: PyMuPDF (fitz)
    if fitz is not None and file_bytes:
        try:
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            for page in doc:
                text += page.get_text()
            if text.strip():
                return text.strip()
        except Exception:
            pass

    # Method 2: pypdf fallback
    if PdfReader is not None:
        try:
            stream = io.BytesIO(file_bytes) if file_bytes else file
            reader = PdfReader(stream)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            if text.strip():
                return text.strip()
        except Exception:
            pass

    return text.strip()