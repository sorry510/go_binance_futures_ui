export default {
  route: {
    dashboard: 'Panel de control',
    documentation: 'Documentación',
    guide: 'Guía',
    permission: 'Permisos',
    rolePermission: 'Permisos de rol',
    pagePermission: 'Permisos de la página',
    directivePermission: 'Permisos de la directiva',
    icons: 'Iconos',
    components: 'Componentes',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Editor JSON',
    dndList: 'Lista Dnd',
    splitPane: 'Panel dividido',
    avatarUpload: 'Subir avatar',
    dropzone: 'Subir ficheros',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'Ir arriba',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Gráficos',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Gráfico de líneas',
    mixChart: 'Mix Chart',
    example: 'Ejemplo',
    nested: 'Rutas anidadass',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Tabla',
    dynamicTable: 'Tabla dinámica',
    dragTable: 'Arrastrar tabla',
    inlineEditTable: 'Editor',
    complexTable: 'Complex Table',
    tab: 'Pestaña',
    form: 'Formulario',
    createArticle: 'Crear artículo',
    editArticle: 'Editar artículo',
    articleList: 'Listado de artículos',
    errorPages: 'Páginas de error',
    page401: '401',
    page404: '404',
    errorLog: 'Registro de errores',
    excel: 'Excel',
    exportExcel: 'Exportar a Excel',
    selectExcel: 'Export seleccionado',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Subir Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Exportar a Zip',
    theme: 'Tema',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'Enlace externo',
    profile: 'Profile',
  },
  navbar: {
    logOut: 'Salir',
    dashboard: 'Panel de control',
    github: 'Github',
    theme: 'Tema',
    size: 'Tamaño global',
    profile: 'Profile',
  },
  login: {
    title: 'Formulario de acceso',
    logIn: 'Acceso',
    username: 'Usuario',
    password: 'Contraseña',
    any: 'nada',
    thirdparty: 'Conectar con',
    thirdpartyTips: 'No se puede simular en local, así que combine su propia simulación de negocios. ! !',
  },
  documentation: {
    documentation: 'Documentación',
    github: 'Repositorio Github',
  },
  permission: {
    addRole: 'Nuevo rol',
    editPermission: 'Permiso de edición',
    roles: 'Tus permisos',
    switchRoles: 'Cambiar permisos',
    tips: 'In some cases it is not suitable to use v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if.',
    delete: 'Borrar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Ver guía',
  },
  components: {
    documentation: 'Documentación',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.',
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'Orden por defecto',
    dragTips2: 'The after dragging order',
    title: 'Título',
    importance: 'Importancia',
    type: 'Tipo',
    remark: 'Remark',
    search: 'Buscar',
    add: 'Añadir',
    export: 'Exportar',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Fecha',
    author: 'Autor',
    readings: 'Lector',
    status: 'Estado',
    actions: 'Acciones',
    edit: 'Editar',
    publish: 'Publicar',
    draft: 'Draft',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    confirm: 'Confirm',
    notClosed: 'No cerrado',
    closed: 'Closed',
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details',
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Documento de introducción',
  },
  excel: {
    export: 'Exportar',
    selectedExport: 'Exportar seleccionados',
    placeholder: 'Por favor escribe un nombre de fichero',
  },
  zip: {
    export: 'Exportar',
    placeholder: 'Por favor escribe un nombre de fichero',
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.',
  },
  theme: {
    change: 'Cambiar tema',
    documentation: 'Documentación del tema',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.',
  },
  tagsView: {
    refresh: 'Actualizar',
    close: 'Cerrar',
    closeOthers: 'Cerrar otros',
    closeAll: 'Cerrar todos',
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo',
  },
}
