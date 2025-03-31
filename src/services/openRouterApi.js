export const generateAlternativeEnding = async (
  movieTitle,
  movieDescription,
) => {
  const prompt = `Придумай 3 креативные альтернативные концовки для фильма: ${movieTitle}.
    Краткое описание фильма: ${movieDescription}.
    Концовки должны быть неожиданными, но логически связанными с сюжетом.
    Стиль концовок: фан-фикшн.
    Не спойлери оригинальный сюжет.
    Ответ должен быть на русском языке.
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
          Authorization: `Bearer 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`,
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

    const data = await response.json();
    return (
      data.choices?.[0]?.message?.content || 'Не удалось сгенерировать концовки'
    );
  } catch (error) {
    console.error('Error generating alternative endings:', error);
    return 'Произошла ошибка при генерации концовок';
  }
};
