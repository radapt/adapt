export default props => `
<div class="component ${props.type} ${props.class || ''}" id="${props.id}" ${props.parentId ? 'ref="' + props.parentId : ''}">
  ${props.children}
</div>
`
