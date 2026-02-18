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
  BedDouble,
  Search,
  Star,
  StarOff,
  ShieldCheck,
  DollarSign,
  FileText,
  Layers
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

// Datos estáticos de habitaciones (puede reemplazarse con fetch si se prefiere)
export const habitaciones = [
  {
    id: 1,
    slug: "matrimonial",
    nombre: "Habitación Matrimonial",
    descripcion:
      "Amplia y confortable habitación con cama de 2 plazas, ubicada entre los pisos 2, 3, 4 y 5.",
    camas: "1 cama de 2 plazas",
    pisos: "Pisos 2 al 5",
    imagen: "/habitaciones/matrimonial.jpg",
  },
  {
    id: 2,
    slug: "doble",
    nombre: "Habitación Doble",
    descripcion:
      "Cómoda habitación con 2 camas de plaza y media, ubicada entre los pisos 1 al 5.",
    camas: "2 camas de plaza y media",
    pisos: "Pisos 1 al 5",
    imagen: "/habitaciones/doble.jpeg",
  },
  {
    id: 3,
    slug: "simple",
    nombre: "Habitación Simple",
    descripcion:
      "Amplia y cómoda habitación con cama de 2 plazas, con vista a la calle, ubicada entre los pisos 2 al 5.",
    camas: "1 cama de 2 plazas",
    pisos: "Pisos 2 al 5",
    imagen: "/habitaciones/simple.jpeg",
  },
  {
    id: 4,
    slug: "king",
    nombre: "Habitación King",
    descripcion:
      "Habitación con amplia cama tipo King, estratégicamente ubicada entre los pisos 2 al 5.",
    camas: "1 cama King",
    pisos: "Pisos 2 al 5",
    imagen: "/habitaciones/doble.jpeg",
  },
];

export default function AdminHabitacionesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    slug: "",
    descripcion: "",
    precio: "",
    camas: "",
    pisos: "",
    imagen: "",
    active: true,
    featured: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const fetchHabitaciones = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "habitaciones"), orderBy("nombre", "asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setItems(data);
    } catch (error) {
      console.error("Error fetching habitaciones:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las habitaciones",
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
      const fileName = `habitaciones/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, imagen: downloadURL }));
      setImagePreview(downloadURL);
      Swal.fire({ icon: "success", title: "¡Imagen subida!", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo subir la imagen", confirmButtonColor: GOLD });
    } finally {
      setUploadingImage(false);
    }
  };

  const generateSlug = (name) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ nombre: "", slug: "", descripcion: "", precio: "", camas: "", pisos: "", imagen: "", active: true, featured: false });
    setImagePreview("");
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      slug: item.slug,
      descripcion: item.descripcion || "",
      precio: item.precio || "",
      camas: item.camas || "",
      pisos: item.pisos || "",
      imagen: item.imagen,
      active: item.active !== undefined ? item.active : true,
      featured: item.featured || false,
    });
    setImagePreview(item.imagen);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.nombre.trim()) {
      Swal.fire({ icon: "warning", title: "Nombre requerido", text: "Por favor ingresa el nombre de la habitación", confirmButtonColor: GOLD });
      return;
    }
    if (!formData.imagen) {
      Swal.fire({ icon: "warning", title: "Imagen requerida", text: "Por favor sube una imagen de la habitación", confirmButtonColor: GOLD });
      return;
    }

    try {
      const dataToSave = {
        ...formData,
        slug: formData.slug || generateSlug(formData.nombre),
        precio: formData.precio ? parseFloat(formData.precio) : null,
      };

      if (editingItem) {
        await updateDoc(doc(db, "habitaciones", editingItem.id), { ...dataToSave, updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Actualizado!", timer: 1500, showConfirmButton: false });
      } else {
        await addDoc(collection(db, "habitaciones"), { ...dataToSave, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        Swal.fire({ icon: "success", title: "¡Creado!", timer: 1500, showConfirmButton: false });
      }

      setShowModal(false);
      fetchHabitaciones();
    } catch (error) {
      console.error("Error saving:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar la habitación", confirmButtonColor: GOLD });
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await updateDoc(doc(db, "habitaciones", item.id), { active: !item.active, updatedAt: serverTimestamp() });
      Swal.fire({ icon: "success", title: item.active ? "Desactivado" : "Activado", timer: 1500, showConfirmButton: false });
      fetchHabitaciones();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo cambiar el estado", confirmButtonColor: GOLD });
    }
  };

  const handleToggleFeatured = async (item) => {
    try {
      await updateDoc(doc(db, "habitaciones", item.id), { featured: !item.featured, updatedAt: serverTimestamp() });
      Swal.fire({ icon: "success", title: item.featured ? "Removido de destacados" : "Añadido a destacados", timer: 1500, showConfirmButton: false });
      fetchHabitaciones();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo cambiar el estado", confirmButtonColor: GOLD });
    }
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "¿Eliminar habitación?",
      text: `Se eliminará "${item.nombre}"`,
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
        if (item.imagen) {
          try {
            await deleteObject(ref(storage, item.imagen));
          } catch (e) { console.log("Error deleting image:", e); }
        }
        await deleteDoc(doc(db, "habitaciones", item.id));
        Swal.fire({ icon: "success", title: "¡Eliminado!", timer: 1500, showConfirmButton: false });
        fetchHabitaciones();
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar la habitación", confirmButtonColor: GOLD });
      }
    }
  };

  const filteredItems = items.filter(item =>
    item.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header estilo Hotel Convención */}
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
                Hotel <span style={{ color: GOLD }}>Convención</span>
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <span className="h-[1px] w-10 bg-[#A67C3D]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
                  Administración de Habitaciones
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
              Nueva Habitación
            </motion.button>
          </div>

          {/* Barra de búsqueda */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="text"
                placeholder="Buscar habitaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D]"
              />
            </div>
          </div>
        </motion.div>

        {/* Grid de Habitaciones */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: GOLD, borderTopColor: "transparent" }} />
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-gray-100 bg-white p-20 text-center shadow-sm"
          >
            <BedDouble size={48} className="mx-auto mb-6 text-gray-200" />
            <p className={`${playfair.className} text-lg font-medium uppercase tracking-widest text-black`}>
              {searchTerm ? "No se encontraron habitaciones" : "Sin Habitaciones"}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {searchTerm ? "Intenta con otros términos" : "Comienza agregando habitaciones al hotel"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden bg-white border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-[#A67C3D]/10"
              >
                {/* Decoración de esquina dorada */}
                <div className="absolute top-3 left-3 z-10 w-6 h-6 pointer-events-none"
                  style={{ borderTop: `1.5px solid ${GOLD}`, borderLeft: `1.5px solid ${GOLD}` }} />
                <div className="absolute bottom-3 right-3 z-10 w-6 h-6 pointer-events-none"
                  style={{ borderBottom: `1.5px solid ${GOLD}`, borderRight: `1.5px solid ${GOLD}` }} />

                {/* Badges */}
                <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                  <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest shadow-sm backdrop-blur-md ${item.active ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                    {item.active ? "Activa" : "Oculta"}
                  </span>
                  {item.featured && (
                    <span className="px-3 py-1 text-[8px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm"
                      style={{ backgroundColor: GOLD, color: "white" }}>
                      ★ Destacada
                    </span>
                  )}
                </div>

                {/* Imagen */}
                <div className="relative h-52 w-full overflow-hidden bg-[#FAF9F6]">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className={`${playfair.className} mb-1 line-clamp-1 text-base font-medium text-black leading-tight`}>
                    {item.nombre}
                  </h3>

                  {item.camas && (
                    <div className="flex items-center gap-2 mb-1">
                      <BedDouble size={11} style={{ color: GOLD }} />
                      <span className="text-[10px] text-gray-500 font-medium">{item.camas}</span>
                    </div>
                  )}
                  {item.pisos && (
                    <div className="flex items-center gap-2 mb-3">
                      <Layers size={11} style={{ color: GOLD }} />
                      <span className="text-[10px] text-gray-500 font-medium">{item.pisos}</span>
                    </div>
                  )}

                  {item.precio && (
                    <div className="mb-4 flex items-center gap-1 text-lg font-black" style={{ color: GOLD }}>
                      <DollarSign size={16} />
                      {parseFloat(item.precio).toFixed(2)}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center justify-center gap-1 bg-gray-50 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
                    >
                      <Pencil size={12} />
                      Editar
                    </button>

                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`flex items-center justify-center gap-1 px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                        item.active
                          ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {item.active ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>

                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className="flex items-center justify-center gap-1 px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all"
                      style={item.featured
                        ? { backgroundColor: "#fef3c7", color: "#92400e" }
                        : { backgroundColor: "#f9fafb", color: "#9ca3af" }
                      }
                    >
                      {item.featured ? <Star size={12} /> : <StarOff size={12} />}
                    </button>

                    <button
                      onClick={() => handleDelete(item)}
                      className="flex items-center justify-center gap-1 bg-red-50 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-red-600 transition-all hover:bg-red-100"
                    >
                      <Trash2 size={12} />
                      Eliminar
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
                className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-10 shadow-2xl border border-gray-100"
              >
                {/* Decoración modal */}
                <div className="absolute top-5 left-5 w-10 h-10"
                  style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
                <div className="absolute bottom-5 right-5 w-10 h-10"
                  style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />

                {/* Modal Header */}
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <p className={`${vibes.className} text-xl text-black`}>
                      {editingItem ? "Editar" : "Nueva"}
                    </p>
                    <h2 className={`${playfair.className} text-2xl font-medium uppercase tracking-[0.12em] text-black`}>
                      Habitación <span style={{ color: GOLD }}>Convención</span>
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
                  {/* Nombre y Precio */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                        <FileText size={13} style={{ color: GOLD }} />
                        Nombre de la Habitación *
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => {
                          const nombre = e.target.value;
                          setFormData(prev => ({ ...prev, nombre, slug: generateSlug(nombre) }));
                        }}
                        placeholder="Ej: Habitación Matrimonial"
                        className="w-full border-b border-gray-200 bg-transparent py-3 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D]"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                        <DollarSign size={13} style={{ color: GOLD }} />
                        Precio por Noche
                        <span className="text-[9px] font-medium normal-case tracking-normal text-gray-300">(opcional)</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.precio}
                        onChange={(e) => setFormData(prev => ({ ...prev, precio: e.target.value }))}
                        placeholder="0.00"
                        className="w-full border-b border-gray-200 bg-transparent py-3 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D]"
                      />
                    </div>
                  </div>

                  {/* Camas y Pisos */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                        <BedDouble size={13} style={{ color: GOLD }} />
                        Tipo de Camas
                      </label>
                      <input
                        type="text"
                        value={formData.camas}
                        onChange={(e) => setFormData(prev => ({ ...prev, camas: e.target.value }))}
                        placeholder="Ej: 1 cama de 2 plazas"
                        className="w-full border-b border-gray-200 bg-transparent py-3 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D]"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                        <Layers size={13} style={{ color: GOLD }} />
                        Pisos Disponibles
                      </label>
                      <input
                        type="text"
                        value={formData.pisos}
                        onChange={(e) => setFormData(prev => ({ ...prev, pisos: e.target.value }))}
                        placeholder="Ej: Pisos 2 al 5"
                        className="w-full border-b border-gray-200 bg-transparent py-3 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D]"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                      <FileText size={13} style={{ color: GOLD }} />
                      Descripción
                    </label>
                    <textarea
                      value={formData.descripcion}
                      onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                      placeholder="Describe las características y comodidades de la habitación..."
                      rows={4}
                      className="w-full border border-gray-200 bg-[#FAF9F6] px-5 py-4 text-sm font-medium text-black placeholder-gray-300 outline-none transition-all focus:border-[#A67C3D] resize-none"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="habitacion-matrimonial"
                      className="w-full border-b border-gray-100 bg-transparent py-3 text-sm text-gray-400 placeholder-gray-200 outline-none transition-all focus:border-[#A67C3D]"
                    />
                  </div>

                  {/* Imagen */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">
                      Fotografía de la Habitación *
                    </label>

                    {imagePreview ? (
                      <div className="relative group">
                        <div className="relative h-64 overflow-hidden border border-gray-100 bg-white">
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                        <button
                          onClick={() => { setImagePreview(""); setFormData(prev => ({ ...prev, imagen: "" })); }}
                          className="absolute -top-3 -right-3 bg-red-500 p-2 text-white shadow-xl hover:bg-red-600 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-60 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-[#FAF9F6] transition-all hover:border-[#A67C3D] hover:bg-white">
                        {uploadingImage ? (
                          <div className="flex flex-col items-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent mb-3"
                              style={{ borderColor: GOLD, borderTopColor: "transparent" }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>Procesando...</span>
                          </div>
                        ) : (
                          <>
                            <Upload size={28} className="mb-3" style={{ color: GOLD }} />
                            <span className="text-xs font-bold uppercase tracking-widest text-black">Cargar Fotografía</span>
                            <span className="mt-1 text-[9px] text-gray-400 uppercase tracking-tighter">PNG, JPG, WEBP • Máx 5MB</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                      </label>
                    )}
                  </div>

                  {/* Switches */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between border border-gray-100 bg-[#FAF9F6] p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full shadow-[0_0_8px] shadow-current"
                          style={{ backgroundColor: formData.active ? GOLD : "#d1d5db", color: formData.active ? GOLD : "#d1d5db" }} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black">Habitación Activa</span>
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

                    <div className="flex items-center justify-between border border-yellow-100 bg-yellow-50 p-6">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full shadow-[0_0_8px] shadow-current ${formData.featured ? "bg-yellow-500 text-yellow-500" : "bg-gray-300 text-gray-300"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-700">★ Destacada</span>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                          className="peer hidden"
                        />
                        <div className="h-6 w-12 rounded-full bg-yellow-200 transition-all peer-checked:bg-yellow-500 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-6" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
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
                    {editingItem ? "Guardar Cambios" : "Crear Habitación"}
                  </button>
                </div>

                {/* Pie del modal */}
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