---
  to: components/<%= name %>/index.less
---
@import '../style/index.less';

@component: <%= h.changeCase.paramCase(name) %>;
@prefix: ~"@{pkg-name}-@{component}";

.@{prefix}-container {
    background-color: #fff;
    border: 1px solid red;
}
