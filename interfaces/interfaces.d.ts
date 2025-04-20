interface Fine {
  id?: number;
  label_code: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  infraction_type: string;
  date: string;
  time: string;
  description: string;
  image_url: string;
  audio_uri?: string | null;
}

interface New {
  id: string;
  fecha: string;
  titulo: string;
  contenido: string;
  foto: string;
}
