// ========================
// Mapping kode gejala ke gambar
// ========================
const gejalaImages = {
  G01: "img/daun_berlubang.jpg",
  G02: "img/daun_dimakan_tepi.jpg",
  G03: "img/ulat_hijau.jpg",
  G04: "img/daun_menggulung.jpg",
  G05: "img/daun_keriting.jpg",
  G06: "img/kutu_hijau.jpg",
  G07: "img/daun_menguning.jpg",
  G08: "img/bercak_putih.jpg",
  G09: "img/daun_bintik_putih.jpg",
  G10: "img/daun_keperakan.jpg",
  G11: "img/bunga_rontok.jpg",
  G12: "img/buah_berlubang.jpg",
  G13: "img/ulat_dalam_buah.jpg",
  G14: "img/batang_berlubang.jpg",
  G15: "img/tanaman_layu.jpg",
  G16: "img/gejala_busuk_akar.jpg",
  G17: "img/ulat_tanah.jpg",
  G18: "img/daun_bercak_coklat.jpg",
  G19: "img/serangga_putih.jpg",
  G20: "img/daun_lengket.jpg",
  G21: "img/semut_tanaman.jpg",
  G22: "img/daun_kekuningan.jpg",
  G23: "img/pertumbuhan_terhambat.jpg",
  G24: "img/daun_rontok.png",
  G25: "img/jaring_laba.jpg",
};

// ========================
// Fungsi untuk popup gejala
// ========================
function showGejalaPopup(kode, nama) {
  const popup = document.getElementById("gejala-popup");
  const img = document.getElementById("gejala-img");
  const desc = document.getElementById("gejala-desc");

  if (popup && img && desc && gejalaImages[kode]) {
    img.src = gejalaImages[kode];
    desc.textContent = `${kode} - ${nama}`;
    popup.classList.remove("hidden");

    // popup hilang otomatis setelah 3 detik
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 3000);
  }
}

function closePopup() {
  const popup = document.getElementById("gejala-popup");
  if (popup) popup.classList.add("hidden");
}

// ========================
// Kelas Utama Sistem Pakar
// ========================
class PlantExpertSystem {
  constructor() {
    this.selectedSymptoms = new Set();
    this.allSymptoms = [];
    this.allDiseases = [];
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadSymptoms();
    await this.loadDiseases();
    this.renderSymptoms();
  }

  setupEventListeners() {
    // Tab navigation
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Symptom search
    const searchInput = document.getElementById("symptom-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.filterSymptoms(e.target.value);
      });
    }

    // Diagnose button
    const diagnoseBtn = document.getElementById("diagnose-btn");
    if (diagnoseBtn) {
      diagnoseBtn.addEventListener("click", () => {
        this.performDiagnosis();
      });
    }

    // Disease selection for backward chaining
    const diseaseSelect = document.getElementById("disease-select");
    if (diseaseSelect) {
      diseaseSelect.addEventListener("change", (e) => {
        if (e.target.value) {
          this.performBackwardChaining(e.target.value);
        } else {
          document.getElementById("backward-results")?.classList.add("hidden");
        }
      });
    }
  }

  switchTab(tabName) {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`[data-tab="${tabName}"]`)
      ?.classList.add("active");

    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(tabName)?.classList.add("active");
  }

  // ========================
  // Load Data
  // ========================
  async loadSymptoms() {
    try {
      const response = await fetch("api/symptoms.php");
      const data = await response.json();
      if (data.success) {
        this.allSymptoms = data.symptoms;
      } else {
        this.showError(data.error || "Gagal memuat data gejala");
      }
    } catch (error) {
      console.error("Error loading symptoms:", error);
      this.showError("Gagal memuat data gejala");
    }
  }

  async loadDiseases() {
    try {
      const response = await fetch("api/diseases.php");
      const data = await response.json();
      if (data.success) {
        this.allDiseases = data.diseases;
        this.populateDiseaseSelect();
      } else {
        this.showError(data.error || "Gagal memuat data penyakit");
      }
    } catch (error) {
      console.error("Error loading diseases:", error);
      this.showError("Gagal memuat data penyakit");
    }
  }

  populateDiseaseSelect() {
    const select = document.getElementById("disease-select");
    if (!select) return;

    select.innerHTML = '<option value="">-- Pilih Hama --</option>';
    this.allDiseases.forEach((disease) => {
      const option = document.createElement("option");
      option.value = disease.kode;
      option.textContent = `${disease.kode} - ${disease.nama_penyakit}`;
      select.appendChild(option);
    });
  }

  // app.js

// --------------------
// Render & Filter Gejala
// --------------------
renderSymptoms(symptoms = this.allSymptoms) {
    const grid = document.getElementById("symptoms-grid");
    if (!grid) return;
    grid.innerHTML = ""; // Bersihkan grid sebelum merender

    // Jika allSymptoms kosong, tampilkan pesan
    if (symptoms.length === 0 && this.allSymptoms.length === 0) {
        grid.innerHTML = "<p>Data gejala tidak ditemukan. Cek file symptoms.php.</p>";
        return;
    }

    symptoms.forEach((symptom) => {
        // PERUBAHAN: Gunakan <button> daripada <div>
        const card = document.createElement("button"); 
        
        // Atur class dan type
        card.className = `symptom-card ${
            this.selectedSymptoms.has(symptom.kd_gejala) ? "selected" : ""
        }`;
        card.type = "button"; // Penting untuk mencegah submit form secara tidak sengaja
        
        // Atur atribut aksesibilitas
        card.setAttribute("aria-pressed", this.selectedSymptoms.has(symptom.kd_gejala));

        card.innerHTML = `
            <div class="symptom-code">${symptom.kd_gejala}</div>
            <div class="symptom-text">${symptom.gejala}</div>
        `;

        // Event listener tetap sama
        card.addEventListener("click", () => {
            this.toggleSymptom(symptom.kd_gejala, symptom.gejala);
            showGejalaPopup(symptom.kd_gejala, symptom.gejala);
        });

        grid.appendChild(card);
    });
}

  filterSymptoms(searchTerm) {
    const filtered = this.allSymptoms.filter(
      (symptom) =>
        symptom.gejala.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.kd_gejala.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.renderSymptoms(filtered);
  }

  toggleSymptom(code, text) {
    if (this.selectedSymptoms.has(code)) {
      this.selectedSymptoms.delete(code);
    } else {
      this.selectedSymptoms.add(code);
    }
    this.updateSelectedSymptoms();
    this.renderSymptoms();
  }

  updateSelectedSymptoms() {
    const container = document.getElementById("selected-symptoms");
    const count = document.getElementById("selected-count");
    const diagnoseBtn = document.getElementById("diagnose-btn");

    if (!container || !count || !diagnoseBtn) return;

    count.textContent = this.selectedSymptoms.size;
    container.innerHTML = "";

    this.selectedSymptoms.forEach((code) => {
      const symptom = this.allSymptoms.find((s) => s.kd_gejala === code);
      if (symptom) {
        const item = document.createElement("div");
        item.className = "selected-item";
        item.innerHTML = `
          <span>${symptom.kd_gejala}</span>
          <button class="remove-symptom" onclick="expertSystem.toggleSymptom('${code}', '${symptom.gejala.replace(/'/g, "\\'")}')">×</button>
        `;
        container.appendChild(item);
      }
    });

    diagnoseBtn.disabled = this.selectedSymptoms.size === 0;
  }

  // ========================
  // Diagnosis (Forward)
  // ========================
  async performDiagnosis() {
    if (this.selectedSymptoms.size === 0) return;
    this.showLoading(true);

    try {
      const response = await fetch("api/diagnose.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: Array.from(this.selectedSymptoms) }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.displayResults(data.results);
      } else {
        this.showError(data.error || "Terjadi kesalahan saat diagnosa");
      }
    } catch (error) {
      console.error("Error performing diagnosis:", error);
      this.showError("Gagal melakukan diagnosa");
    } finally {
      this.showLoading(false);
    }
  }

  displayResults(results) {
    const resultsSection = document.getElementById("results-section");
    const resultsContainer = document.getElementById("diagnosis-results");

    if (!resultsSection || !resultsContainer) return;

    resultsSection.classList.remove("hidden");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="result-card">
          <div class="text-center">
            <h4>Tidak Ada Diagnosa Ditemukan</h4>
            <p>Kombinasi gejala tidak cocok. Silakan periksa kembali.</p>
          </div>
        </div>
      `;
      return;
    }

    results.forEach((result) => {
      const card = document.createElement("div");
      card.className = "result-card";

      const confidenceClass = this.getConfidenceClass(result.confidence);
      const matchedSymptomsText = result.matched_symptoms.map((code) => {
        const symptom = this.allSymptoms.find((s) => s.kd_gejala === code);
        return symptom ? symptom.gejala : code;
      });

      card.innerHTML = `
        <div class="result-header">
          <div class="disease-info">
            <h4>${result.disease.nama_penyakit}</h4>
            <p><strong>Penyebab:</strong> ${result.disease.deskripsi || "Tidak ada deskripsi"}</p>
            <p><strong>Nama Latin:</strong> ${result.disease.nama_latin || "Tidak diketahui"}</p>
            <div class="danger-level">
              <span>Tingkat Bahaya:</span>
              <span class="danger-badge">${result.disease.tingkat_bahaya || "Tidak diketahui"}</span>
            </div>
          </div>
          <div class="confidence-badge ${confidenceClass}">
            ${Math.round(result.confidence)}% Yakin
          </div>
        </div>
        <div class="matched-symptoms">
          <h5>Gejala yang Cocok:</h5>
          <div class="symptom-list">
            ${matchedSymptomsText
              .map((text) => `<span class="symptom-tag">${text}</span>`)
              .join("")}
          </div>
        </div>
        <div class="solutions-section">
          <h5>Solusi Pengobatan:</h5>
          ${this.renderSolutions(result.solutions)}
        </div>
      `;

      resultsContainer.appendChild(card);
    });

    resultsSection.scrollIntoView({ behavior: "smooth" });
  }

  renderSolutions(solutions) {
    if (!solutions || solutions.length === 0) {
      return "<p>Tidak ada solusi tersedia.</p>";
    }
    return solutions
      .map(
        (solution) => `
        <div class="solution-item">
          <div class="solution-name">${solution.nama_obat}</div>
          <div class="solution-details">${solution.solusi}</div>
        </div>
      `
      )
      .join("");
  }

  getConfidenceClass(confidence) {
    if (confidence >= 80) return "confidence-high";
    if (confidence >= 60) return "confidence-medium";
    return "confidence-low";
  }

  // ========================
  // Backward Chaining
  // ========================
  async performBackwardChaining(diseaseCode) {
    this.showLoading(true);
    try {
      const response = await fetch("api/backward.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disease_code: diseaseCode }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        this.displayBackwardResults(data);
      } else {
        this.showError(data.error || "Terjadi kesalahan saat analisis");
      }
    } catch (error) {
      console.error("Error backward chaining:", error);
      this.showError("Gagal melakukan analisis");
    } finally {
      this.showLoading(false);
    }
  }

  displayBackwardResults(data) {
    const resultsSection = document.getElementById("backward-results");
    if (!resultsSection) return;

    document.getElementById("pest-name").textContent =
      data.pest.nama_penyakit;
    document.getElementById("pest-latin").textContent =
      data.pest.nama_latin || "Tidak diketahui";
    document.getElementById("pest-description").textContent =
      data.pest.deskripsi || "Tidak ada deskripsi";
    document.getElementById("danger-level").textContent =
      data.pest.tingkat_bahaya || "Tidak diketahui";

    const symptomsList = document.getElementById("required-symptoms-list");
    if (symptomsList) {
      symptomsList.innerHTML = "";
      if (data.required_symptoms.length === 0) {
        symptomsList.innerHTML = "<p>Tidak ada gejala spesifik.</p>";
      } else {
        data.required_symptoms.forEach((symptom) => {
          const item = document.createElement("div");
          item.className = "symptom-item";
          item.innerHTML = `
            <div class="symptom-item-code">${symptom.kd_gejala}</div>
            <div class="symptom-item-text">${symptom.gejala}</div>
          `;
          symptomsList.appendChild(item);
        });
      }
    }

    const solutionsList = document.getElementById("solutions-list");
    if (solutionsList) {
      solutionsList.innerHTML = this.renderSolutions(data.control_methods);
    }

    resultsSection.classList.remove("hidden");
  }

  // ========================
  // Util
  // ========================
  showLoading(show) {
    const overlay = document.getElementById("loading-overlay");
    if (!overlay) return;
    if (show) {
      overlay.classList.remove("hidden");
    } else {
      overlay.classList.add("hidden");
    }
  }

  showError(message) {
    alert(message);
  }
}

// ========================
// Init sistem saat DOM ready
// ========================
let expertSystem;
document.addEventListener("DOMContentLoaded", () => {
  expertSystem = new PlantExpertSystem();
});
