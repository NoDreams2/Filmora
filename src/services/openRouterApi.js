const openRouterApiKey = import.meta.env.VITE_OPENROUTER_KEY;

export const generateAlternativeEnding = async (
  movieTitle,
  movieDescription,
) => {
  const prompt = `Придумай 3 креативные альтернативные концовки для фильма: ${movieTitle}.
    Краткое описание фильма: ${movieDescription}.
    Концовки должны быть:
    - неожиданными, но логически связанными с оригинальным сюжетом
    - строго соответствовать жанру фильма (без смешения жанров) 
    (например, если ты придумываешь концовку для фильма титаник, то концовки с призраками и петлей времени будут не совсем уместны)
    - сохранять общий тон и стиль повествования
    - логически обоснованными (без противоречий установленным правилам вселенной)

    Стиль концовок: фан-фикшн.
    Не спойлери оригинальный сюжет.
    Ответ должен быть на русском языке.
    Не используй кавычки в своем ответе.

    Формат ответа:
    1) [Краткое название концовки из 2-4 слов]:
       [Подробное описание на 2-3 предложения]

    2) [Название]:
       [Описание]

    3) [Название]:
       [Описание]`;

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://filmora-app.com',
          'X-Title': 'Filmora AI Endings',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 10000,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return (
      data.choices?.[0]?.message?.content || 'Не удалось сгенерировать концовки'
    );
  } catch (error) {
    console.error('Error generating alternative endings:', error);
    return 'Произошла ошибка при генерации концовок';
  }
};
