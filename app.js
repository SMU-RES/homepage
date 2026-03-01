const state = {
  keyword: "",
  resources: [
    {
      title: "海大选课通",
      description: "课程与教师评价平台，提供动态站与静态站两个入口。",
      noteDynamic: "动态站可评论、可评分，适合发布和参与评价。",
      noteStatic:
        "静态站只能查看，但体验更好。为了节省服务器资源，如果只想查看，建议使用静态站。",
      dynamicUrl: "https://smu-course-review.pages.dev",
      staticUrl: "https://smu-course-review-static.pages.dev",
      tags: ["选课通", "动态站", "静态站", "课程评价", "教师评价"],
    },
  ],
}

const searchForm = document.querySelector("#searchForm")
const searchInput = document.querySelector("#searchInput")
const resourceGrid = document.querySelector("#resourceGrid")
const resultCount = document.querySelector("#resultCount")
const template = document.querySelector("#resourceCardTemplate")
const installBtn = document.querySelector("#installBtn")

function getFilteredResources() {
  const keyword = state.keyword.trim().toLowerCase()
  if (!keyword) return state.resources

  return state.resources.filter((resource) => {
    const haystack = [
      resource.title,
      resource.description,
      resource.noteDynamic,
      resource.noteStatic,
      ...(resource.tags || []),
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(keyword)
  })
}

function renderResources() {
  const filtered = getFilteredResources()
  resultCount.textContent = `共 ${filtered.length} 项`
  resourceGrid.innerHTML = ""

  if (filtered.length === 0) {
    const empty = document.createElement("div")
    empty.className = "empty"
    empty.textContent = "未找到匹配资源，请调整搜索关键词。"
    resourceGrid.append(empty)
    return
  }

  for (const resource of filtered) {
    const card = template.content.firstElementChild.cloneNode(true)
    card.querySelector(".resource-title").textContent = resource.title
    card.querySelector(".resource-desc").textContent = resource.description

    const note = card.querySelector(".resource-note")
    note.innerHTML = `
      <p>${resource.noteDynamic}</p>
      <p>${resource.noteStatic}</p>
    `

    const [dynamicBtn, staticBtn] = card.querySelectorAll(".site-btn")
    dynamicBtn.href = resource.dynamicUrl
    staticBtn.href = resource.staticUrl

    resourceGrid.append(card)
  }
}

function bindSearch() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    state.keyword = searchInput.value
    renderResources()
  })

  searchInput.addEventListener("input", () => {
    state.keyword = searchInput.value
    renderResources()
  })
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("service worker 注册失败:", error)
    })
  })
}

function setupInstallPrompt() {
  let deferredPrompt = null

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault()
    deferredPrompt = event
    installBtn.hidden = false
  })

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
    installBtn.hidden = true
  })

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null
    installBtn.hidden = true
  })
}

function boot() {
  bindSearch()
  renderResources()
  registerServiceWorker()
  setupInstallPrompt()
}

boot()
