export const getVideos= async () => {
    const response = await fetch(
      "https://adamix.net/defensa_civil/def/videos.php"
    );
    const data = await response.json();
    return data;
  };
  