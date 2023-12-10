import tkinter as tk
from tkinter import ttk
from googletrans import Translator
import speech_recognition as sr
from gtts import gTTS
import threading
import os

class LanguageTranslator:
    def __init__(self):
        self.translator = Translator()

    def recognize_speech(self):
        recognizer = sr.Recognizer()

        with sr.Microphone() as source:
            print("Speak something...")
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source)

        try:
            print("Recognizing...")
            text = recognizer.recognize_google(audio)
            print(f"Recognized text: {text}")
            return text
        except sr.UnknownValueError:
            print("Could not understand audio.")
            return None
        except sr.RequestError as e:
            print(f"Error connecting to Google Speech Recognition service: {e}")
            return None

    def translate_text(self, text, target_language='en'):
        translation = self.translator.translate(text, dest=target_language)
        return translation.text

    def speak_text(self, text, language='en'):
        tts = gTTS(text, lang=language, slow=False)
        tts.save("output.mp3")
        os.system("start output.mp3")

class TranslatorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Voice Translator")

        self.translator = LanguageTranslator()

        self.create_gui()

    def create_gui(self):
        # Create the microphone button
        self.microphone_button = ttk.Button(self.root, text="🎤", command=self.start_translation)
        self.microphone_button.grid(row=0, column=0, pady=10)

        # Create the output label
        self.output_label = ttk.Label(self.root, text="", font=("Helvetica", 12))
        self.output_label.grid(row=1, column=0, pady=10)

    def start_translation(self):
        # Start a new thread to handle voice input and translation
        threading.Thread(target=self.handle_translation).start()

    def handle_translation(self):
        # Disable the microphone button during translation
        self.microphone_button["state"] = "disabled"

        # Get input text from voice
        text_to_translate = self.translator.recognize_speech()

        if not text_to_translate:
            # Enable the microphone button if there's an issue with voice recognition
            self.microphone_button["state"] = "normal"
            return

        # Get the target language from the user (you can set a default language or use a dropdown)
        target_language = "es"  # Replace with your logic for getting the target language

        # Perform translation
        translated_text = self.translator.translate_text(text_to_translate, target_language)

        # Display the translated text
        self.output_label["text"] = f"Translated text: {translated_text}"

        # Speak the translated text
        self.translator.speak_text(translated_text, target_language)

        # Enable the microphone button after translation is complete
        self.microphone_button["state"] = "normal"

def main():
    root = tk.Tk()
    app = TranslatorApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
