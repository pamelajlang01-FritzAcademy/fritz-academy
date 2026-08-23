// Shared Creative Engine adapter for Fritz Academy.
// Configure window.FRITZ_CREATIVE_ENGINE_URL and, if needed, window.FRITZ_CREATIVE_ENGINE_KEY.

(function () {
  function baseUrl() {
    return (window.FRITZ_CREATIVE_ENGINE_URL || "").replace(/\/$/, "");
  }

  async function request(path, options) {
    if (!baseUrl()) throw new Error("FRITZ_CREATIVE_ENGINE_URL is not configured yet.");
    var headers = Object.assign({ "Content-Type": "application/json" }, options && options.headers);
    if (window.FRITZ_CREATIVE_ENGINE_KEY) headers.Authorization = "Bearer " + window.FRITZ_CREATIVE_ENGINE_KEY;
    var response = await fetch(baseUrl() + path, Object.assign({}, options, { headers: headers }));
    if (!response.ok) throw new Error("Fritz Creative Studio request failed: " + (await response.text()));
    return response.json();
  }

  window.FritzCreativeEngine = {
    createMedia: function (config) {
      config = config || {};
      return request("/jobs", {
        method: "POST",
        body: JSON.stringify({
          prompt: config.prompt,
          outputType: config.outputType || "illustration",
          quality: config.quality || "standard",
          aspectRatio: config.aspectRatio || "16:9",
          durationSeconds: config.durationSeconds,
          context: {
            sourceApp: "Fritz",
            organization: "Rise Above Education",
            brand: "Fritz Academy",
            projectId: config.lessonId,
            audience: config.level || "Beginner ESL",
            metadata: {
              lessonId: config.lessonId,
              vocabulary: config.vocabulary || [],
              learningGoal: config.learningGoal || "",
            },
          },
        }),
      });
    },
    getJob: function (jobId) {
      return request("/jobs/" + encodeURIComponent(jobId), { method: "GET" });
    },
  };
})();
