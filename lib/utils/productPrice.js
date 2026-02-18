/**
 * Utilidades para manejar precios de productos con descuentos
 * Mocca Pets - Sistema de Outlet
 */

/**
 * Obtiene el precio final de un producto (considerando descuentos)
 * @param {Object} product - Producto con sus datos
 * @returns {number} - Precio final a cobrar
 */
export function getProductPrice(product) {
  // Si el producto está en oferta y tiene precio de oferta válido
  if (product.onSale && product.salePrice > 0) {
    return parseFloat(product.salePrice);
  }
  
  // Si está en oferta pero no tiene salePrice, calcularlo del descuento
  if (product.onSale && product.discountPercent > 0) {
    const originalPrice = parseFloat(product.price);
    const discount = (originalPrice * product.discountPercent) / 100;
    return originalPrice - discount;
  }
  
  // Precio normal sin descuento
  return parseFloat(product.price);
}

/**
 * Verifica si un producto tiene descuento activo
 * @param {Object} product - Producto a verificar
 * @returns {boolean}
 */
export function hasDiscount(product) {
  return product.onSale && (product.salePrice > 0 || product.discountPercent > 0);
}

/**
 * Calcula el ahorro del producto
 * @param {Object} product - Producto
 * @returns {number} - Monto de ahorro
 */
export function getSavings(product) {
  if (!hasDiscount(product)) return 0;
  
  const originalPrice = parseFloat(product.price);
  const finalPrice = getProductPrice(product);
  
  return originalPrice - finalPrice;
}

/**
 * Obtiene el porcentaje de descuento real
 * @param {Object} product - Producto
 * @returns {number} - Porcentaje de descuento
 */
export function getDiscountPercent(product) {
  if (!hasDiscount(product)) return 0;
  
  // Si ya tiene el porcentaje definido, usarlo
  if (product.discountPercent > 0) {
    return product.discountPercent;
  }
  
  // Calcularlo desde los precios
  const originalPrice = parseFloat(product.price);
  const finalPrice = parseFloat(product.salePrice);
  
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
}

/**
 * Formatea un precio para mostrar
 * @param {number} price - Precio a formatear
 * @returns {string} - Precio formateado
 */
export function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}