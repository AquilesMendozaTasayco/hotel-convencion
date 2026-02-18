"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import Swal from "sweetalert2";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload,
  X,
  Save,
  MonitorPlay,
  ShieldCheck
} from "lucide-react";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    active: true,
    order: 0
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "banners"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const bannersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBanners(bannersData);
    } catch (error) {
      console.error("Error fetching banners:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los banners",
        confirmButtonColor: GOLD,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({ icon: "error", title: "Archivo inválido", text: "Por favor selecciona una imagen válida", confirmButtonColor: GOLD });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({ icon: "error", title: "Archivo muy grande", text: "La imagen no debe superar 5MB", confirmButtonColor: GOLD });
      return;
    }

    try {
      setUploadingImage(true);
      const timestamp = Date.now();
      const fileName = `banners/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
      setImagePreview(downloadURL);
      Swal.fire({ icon: "success", title: "¡Imagen subida!", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo subir la imagen", confirmButtonColor: GOLD });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreate = () => {
    setEditingBanner(null);
    setFormData({ imageUrl: "", active: true, order: banners.length });
    setImagePreview("");
    setShowModal(true);
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({ imageUrl: banner.imageUrl, active: banner.active, order: banner.order });
    setImagePreview(banner.imageUrl);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.imageUrl) {
      Swal.fire({ icon: "warning", title: "Imagen requerida", text: "Por favor sube una imagen para el banner", confirmButtonColor: GOLD });
      return;
    }
    try {
      if (editingBanner) {
        await updateDoc(doc(db, "banners", editingBanner.id), { ...formData, updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Actualizado!", timer: 1500, showConfirmButton: false });
      } else {
        await addDoc(collection(db, "banners"), { ...formData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Publicado!", timer: 1500, showConfirmButton: false });
      }
      setShowModal(false);
      fetchBanners();
    } catch (error) {
      console.error("Error saving banner:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar el banner", confirmButtonColor: GOLD });
    }
  };

  const handleToggleActive = async (banner) => {
    try {
      await updateDoc(doc(db, "banners", banner.id), { active: !banner.active, updatedAt: serverTimestamp() });
      fetchBanners();
    } catch (error) {
      console.error("Error toggling banner:", error);
    }
  };

  const handleDelete = async (banner) => {
    const result = await Swal.fire({
      title: "¿Eliminar banner?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a1410",
      cancelButtonColor: "#E5E7EB",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        if (banner.imageUrl) {
          try { await deleteObject(ref(storage, banner.imageUrl)); } catch (e) { console.log(e); }
        }
        await deleteDoc(doc(db, "banners", banner.id));
        fetchBanners();
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className={`${vibes.className} text-2xl text-black mb-1`}>
                Gestión de
              </p>
              <h1 className={`${playfair.className} text-4xl font-medium uppercase tracking-[0.12em] text-black`}>
                Banners <span style={{ color: GOLD }}>Hero</span>
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <span className="h-[1px] w-10" style={{ backgroundColor: GOLD }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
                  Hotel Convención · Carrusel Principal
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              className="flex items-center justify-center gap-3 bg-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-[#A67C3D]"
            >
              <Plus size={18} />
              Nuevo Banner
            </motion.button>
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: GOLD, borderTopColor: "transparent" }} />
          </div>
        ) : banners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-gray-100 bg-white p-20 text-center shadow-sm"
          >
            <MonitorPlay size={48} className="mx-auto mb-6 text-gray-200" />
            <p className={`${playfair.className} text-lg font-medium uppercase tracking-widest text-black`}>
              Sin Banners
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Comienza subiendo una imagen para el carrusel principal.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
          >
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden bg-white border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-[#A67C3D]/10"
              >
                {/* Decoración esquinas */}
                <div className="absolute top-3 left-3 z-10 w-6 h-6 pointer-events-none"
                  style={{ borderTop: `1.5px solid ${GOLD}`, borderLeft: `1.5px solid ${GOLD}` }} />
                <div className="absolute bottom-[72px] right-3 z-10 w-6 h-6 pointer-events-none"
                  style={{ borderBottom: `1.5px solid ${GOLD}`, borderRight: `1.5px solid ${GOLD}` }} />

                {/* Badges */}
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-black shadow-sm">
                    #{banner.order}
                  </div>
                  <div className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-widest shadow-sm backdrop-blur-md ${
                    banner.active ? "bg-black text-white" : "bg-gray-100/90 text-gray-400"
                  }`}>
                    {banner.active ? "Activo" : "Oculto"}
                  </div>
                </div>

                {/* Imagen */}
                <div className="relative h-64 w-full overflow-hidden bg-[#FAF9F6]">
                  <img
                    src={banner.imageUrl}
                    alt={`Banner ${banner.order}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Acciones */}
                <div className="p-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="flex flex-1 items-center justify-center gap-2 bg-gray-50 py-3 text-[9px] font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
                    >
                      <Pencil size={13} />
                      Editar
                    </button>

                    <button
                      onClick={() => handleToggleActive(banner)}
                      className={`flex items-center justify-center p-3 transition-all ${
                        banner.active
                          ? "bg-orange-50 text-orange-500 hover:bg-orange-100"
                          : "bg-green-50 text-green-500 hover:bg-green-100"
                      }`}
                    >
                      {banner.active ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>

                    <button
                      onClick={() => handleDelete(banner)}
                      className="flex items-center justify-center bg-red-50 p-3 text-red-400 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 30 }}
                className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-10 shadow-2xl border border-gray-100"
              >
                {/* Decoración */}
                <div className="absolute top-5 left-5 w-10 h-10"
                  style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
                <div className="absolute bottom-5 right-5 w-10 h-10"
                  style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <p className={`${vibes.className} text-xl text-black`}>
                      Configuración del
                    </p>
                    <h2 className={`${playfair.className} text-2xl font-medium uppercase tracking-[0.12em] text-black`}>
                      Banner <span style={{ color: GOLD }}>Hero</span>
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-50 p-3 text-gray-400 transition-all hover:text-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Orden */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                      Prioridad de Aparición
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full border-b border-gray-200 bg-transparent py-3 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D]"
                    />
                  </div>

                  {/* Imagen */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                      Imagen del Banner *
                    </label>

                    {imagePreview ? (
                      <div className="relative group">
                        <div className="relative h-56 overflow-hidden border border-gray-100">
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <button
                          onClick={() => { setImagePreview(""); setFormData(prev => ({ ...prev, imageUrl: "" })); }}
                          className="absolute -top-3 -right-3 bg-red-500 p-2 text-white shadow-xl hover:bg-red-600 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-56 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-[#FAF9F6] transition-all hover:border-[#A67C3D] hover:bg-white">
                        {uploadingImage ? (
                          <div className="flex flex-col items-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent mb-3"
                              style={{ borderColor: GOLD, borderTopColor: "transparent" }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>Procesando...</span>
                          </div>
                        ) : (
                          <>
                            <Upload size={28} className="mb-3" style={{ color: GOLD }} />
                            <span className="text-xs font-bold uppercase tracking-widest text-black">Cargar Imagen</span>
                            <span className="mt-1 text-[9px] text-gray-400 uppercase tracking-tighter">PNG, JPG, WEBP • Recomendado 21:9</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                      </label>
                    )}
                  </div>

                  {/* Switch */}
                  <div className="flex items-center justify-between border border-gray-100 bg-[#FAF9F6] p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full shadow-[0_0_8px] shadow-current"
                        style={{ backgroundColor: formData.active ? GOLD : "#d1d5db", color: formData.active ? GOLD : "#d1d5db" }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black">
                        Mostrar en el sitio
                      </span>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                        className="peer hidden"
                      />
                      <div className="h-6 w-12 rounded-full bg-gray-200 transition-all peer-checked:bg-[#A67C3D] after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-6" />
                    </label>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-10 flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-200 bg-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 transition-all hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={uploadingImage}
                    className="flex-[2] flex items-center justify-center gap-3 bg-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-[#A67C3D] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} />
                    {editingBanner ? "Guardar Cambios" : "Publicar Banner"}
                  </button>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" style={{ color: GOLD }} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300">Panel Seguro · Hotel Convención</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}