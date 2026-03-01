const state = {
  keyword: "",
  category: "全部",
  resources: [],
}

const searchForm = document.querySelector("#searchForm")
const searchInput = document.querySelector("#searchInput")
const categoryRail = document.querySelector("#categoryRail")
const resourceGrid = document.querySelector("#resourceGrid")
const resultCount = document.querySelector("#resultCount")
const template = document.querySelector("#resourceCardTemplate")
const installBtn = document.querySelector("#installBtn")

function renderCategories() {
  const categories = ["全部"]
  categoryRail.innerHTML = ""

  for (const category of categories) {
    const chip = document.createElement("button")
    chip.type = "button"
    chip.textContent = category
    chip.setAttribute("aria-pressed", String(state.category === category))
    chip.addEventListener("click", () => {
      state.category = category
      renderCategories()
      renderResources()
    })
    categoryRail.append(chip)
  }
}

function renderResources() {
  const keyword = state.keyword.trim().toLowerCase()
  const filtered = state.resources.filter((resource) => {
    if (state.category !== "全部" && resource.category !== state.category) return false
    if (!keyword) return true

    const text = [resource.title, resource.description, resource.category, ...(resource.tags || [])]
      .join(" ")
      .toLowerCase()
    return text.includes(keyword)
  })

  resultCount.textContent = `共 ${filtered.length} 项`
  resourceGrid.innerHTML = ""

  if (filtered.length === 0) {
    const empty = document.createElement("div")
    empty.className = "empty"
    empty.textContent = "脚手架已完成。请在 app.js 中填充 resources 数组。"
    resourceGrid.append(empty)
    return
  }

  for (const resource of filtered) {
    const card = template.content.firstElementChild.cloneNode(true)
    card.querySelector(".resource-category").textContent = resource.category
    card.querySelector(".resource-title").textContent = resource.title
    card.querySelector(".resource-desc").textContent = resource.description
    const link = card.querySelector(".resource-link")
    link.href = resource.url
    resourceGrid.append(card)
  }
}

function bindSearch() {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    state.keyword = searchInput.value
    renderResources()
  })
}

function enableWheelScroll() {
  categoryRail.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      categoryRail.scrollLeft += event.deltaY
    },
    { passive: false }
  )
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
  renderCategories()
  renderResources()
  bindSearch()
  enableWheelScroll()
  registerServiceWorker()
  setupInstallPrompt()
}

boot()
