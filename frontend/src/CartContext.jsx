import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('auditdna_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('auditdna_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('auditdna_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('auditdna_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      cartId: `CART-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString()
    };
    setCart(prev => [...prev, cartItem]);
    return cartItem;
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  const getTax = () => {
    return getTotal() * 0.08; // 8% tax
  };

  const getGrandTotal = () => {
    return getTotal() + getTax();
  };

  const createOrder = (customerInfo, paymentInfo) => {
    const orderNumber = orders.length + 1001; // Start from 1001
    const order = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      orderNumber: orderNumber,
      receiptNumber: `RCP-${orderNumber}-${new Date().getFullYear()}`,
      date: new Date().toISOString(),
      timestamp: Date.now(),
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        company: customerInfo.company || '',
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zip: customerInfo.zip
      },
      payment: {
        method: paymentInfo.method,
        last4: paymentInfo.cardNumber ? paymentInfo.cardNumber.slice(-4) : '',
        status: 'completed',
        transactionId: `TXN-${Date.now()}`
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        days: item.days,
        unit: item.unit || '',
        critical: item.critical || false
      })),
      pricing: {
        subtotal: getTotal(),
        tax: getTax(),
        total: getGrandTotal()
      },
      status: 'confirmed',
      trackingNumber: `TRK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    setOrders(prev => [...prev, order]);
    clearCart();
    
    // Send to backend (placeholder for production)
    console.log('📧 Order created and saved:', order);
    
    return order;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.orderId === orderId);
  };

  const getOrderAnalytics = () => {
    const testCounts = {};
    const moduleCounts = {};
    const revenue = { total: 0, byModule: {}, byTest: {} };
    const customerStats = {};

    orders.forEach(order => {
      // Customer stats
      if (!customerStats[order.customer.email]) {
        customerStats[order.customer.email] = {
          name: order.customer.name,
          orders: 0,
          revenue: 0
        };
      }
      customerStats[order.customer.email].orders++;
      customerStats[order.customer.email].revenue += order.pricing.total;

      order.items.forEach(item => {
        // Count by test ID
        testCounts[item.id] = (testCounts[item.id] || 0) + 1;
        
        // Count by module (extract from ID prefix)
        const module = item.id.split('-')[0];
        moduleCounts[module] = (moduleCounts[module] || 0) + 1;
        
        // Revenue
        revenue.total += item.price;
        revenue.byModule[module] = (revenue.byModule[module] || 0) + item.price;
        revenue.byTest[item.id] = (revenue.byTest[item.id] || 0) + item.price;
      });
    });

    const topTests = Object.entries(testCounts)
      .map(([id, count]) => {
        const test = orders.flatMap(o => o.items).find(i => i.id === id);
        return {
          id,
          name: test?.name || id,
          count,
          revenue: revenue.byTest[id] || 0
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const topModules = Object.entries(moduleCounts)
      .map(([module, count]) => ({
        module,
        count,
        revenue: revenue.byModule[module] || 0
      }))
      .sort((a, b) => b.revenue - a.revenue);

    return {
      totalOrders: orders.length,
      totalRevenue: revenue.total,
      totalTax: orders.reduce((sum, o) => sum + o.pricing.tax, 0),
      averageOrderValue: orders.length > 0 ? revenue.total / orders.length : 0,
      testCounts,
      moduleCounts,
      revenue,
      topTests,
      topModules,
      customerStats: Object.values(customerStats).sort((a, b) => b.revenue - a.revenue),
      recentOrders: orders.slice(-10).reverse()
    };
  };

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      getTax,
      getGrandTotal,
      createOrder,
      getOrderById,
      getOrderAnalytics
    }}>
      {children}
    </CartContext.Provider>
  );
};
