import axios from 'axios'

export const TextToSpeech = {
  async getAudioFile(text: string, speaker: number) {
    return fetch('https://wf.chat2desk.kg/insert-into-db', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        speaker_id: speaker,
      }),
    })
  },
}
