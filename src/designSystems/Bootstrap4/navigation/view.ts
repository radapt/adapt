export default props => {
  const links = props.links.map((link) => `
    <li class="nav-item${link.active ? ' active' : ''}">
      <a
        class="nav-link${link.disabled ? ' disabled' : ''}"
        ref="${link.key}"
        role="button"
        href=""#"
        ${link.disabled ? 'aria-disabled="true"' : ''}
        ${link.tabIndex ? 'tabindex="' + link.tabIndex + '"' : ''}
      >
        ${link.text}${link.active ? '<span class="sr-only">(current)</span>' : ''}
      </a>
    </li>
  `);
  return `
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        ${links.join('')}
      </ul>
    </div>
    `
}
