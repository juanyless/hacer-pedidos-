const productos = [
    {
      nombre: 'Pizza Margarita',
      descripcion: 'Clásica pizza con tomate, mozzarella y albahaca.',
      precio: 12.99,
      imagen: 'pizza-margarita.jpg', // Asegúrate de tener la imagen en la misma carpeta
    },
    {
      nombre: 'Hamburguesa Clásica',
      descripcion: 'Hamburguesa con carne, lechuga, tomate y queso.',
      precio: 9.99,
      imagen: 'hamburguesa-clasica.jpg', // Asegúrate de tener la imagen en la misma carpeta
    },
    {
      nombre: 'Ensalada César',
      descripcion: 'Ensalada con pollo, lechuga, crutones y aderezo César.',
      precio: 8.99,
      imagen: 'ensalada-cesar.jpg', // Asegúrate de tener la imagen en la misma carpeta
    },

    {
        nombre: 'milanesa',
        descripcion: 'Clásica pizza con tomate, mozzarella y albahaca.',
        precio: 12.99,
        imagen: 'pizza-margarita.jpg', // Asegúrate de tener la imagen en la misma carpeta
      },
      {
        nombre: 'pure',
        descripcion: 'Hamburguesa con carne, lechuga, tomate y queso.',
        precio: 9.99,
        imagen: 'hamburguesa-clasica.jpg', // Asegúrate de tener la imagen en la misma carpeta
      },
      {
        nombre: 'Ensalada César',
        descripcion: 'Ensalada con pollo, lechuga, crutones y aderezo César.',
        precio: 8.99,
        imagen: 'ensalada-cesar.jpg', // Asegúrate de tener la imagen en la misma carpeta
      },
  ];
  
  const productosDiv = document.getElementById('productos');
  const productoSelect = document.getElementById('producto');
  const pedidoForm = document.getElementById('pedido-form');
  const listaPedidos = document.getElementById('lista-pedidos');
  
  // Función para mostrar los productos en el HTML
  function mostrarProductos() {
    productos.forEach((producto) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
  
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
      `;
  
      productosDiv.appendChild(productoDiv);
  
      const option = document.createElement('option');
      option.value = producto.nombre;
      option.textContent = producto.nombre;
      productoSelect.appendChild(option);
    });
  }
  
  // Función para agregar un pedido
  pedidoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const producto = document.getElementById('producto').value;
  
    const nuevoPedido = { nombre, plato: producto };
  
    try {
      const respuesta = await fetch('https://juanyless.github.io/hacer-pedidos-/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPedido),
      });
  
      if (respuesta.ok) {
        mostrarPedido(nuevoPedido);
        pedidoForm.reset();
      } else {
        console.error('Error al agregar el pedido');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  });
  
  // Función para cargar los pedidos existentes
  async function cargarPedidos() {
    try {
      const respuesta = await fetch('https://juanyless.github.io/hacer-pedidos-/');
      const pedidos = await respuesta.json();
      pedidos.forEach(mostrarPedido);
    } catch (error) {
      console.error('Error al cargar los pedidos:', error);
    }
  }
  
  // Función para mostrar un pedido en la lista
  function mostrarPedido(pedido) {
    const itemPedido = document.createElement('li');
    itemPedido.textContent = `${pedido.nombre}: ${pedido.plato}`;
    listaPedidos.appendChild(itemPedido);
  }
  
  // Cargar los productos y los pedidos al cargar la página
  mostrarProductos();
  cargarPedidos();

  function mostrarPedido(pedido) {
    const itemPedido = document.createElement('li');
    //Busco el producto por el nombre del plato.
    const productoPedido = productos.find(producto => producto.nombre === pedido.plato);
    itemPedido.innerHTML = `
      <img src="${productoPedido.imagen}" alt="${pedido.plato}" style="max-width: 50px; max-height: 50px;">
      ${pedido.nombre}: ${pedido.plato}
    `;
    listaPedidos.appendChild(itemPedido);
  }
