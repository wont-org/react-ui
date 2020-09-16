# BEM规则

# style方案

## color
```less
// color copy from element
@color-primary: #409EFF;
@color-success: #67C23A;
@color-warning: #E6A23C;
@color-danger: #F56C6C;
@color-info: #909399;
```
### border
### background
### font-color
### shadow

## size

### size
```less
.size(@width; @height) {
  width: @width;
  height: @height;
}
@lg: 24px;
@md: 16px;
@sm: 12px;
@xs: 8px;
@xss: 4px;
```

### margin
```less
@margin-lg: @lg; // containers
@margin-md: @md; // small containers and buttons
@margin-sm: @sm; // Form controls and items
@margin-xs: @xs; // small items
@margin-xss: @xss; // more small
```

### padding
```less
@padding-lg: @lg; // containers
@padding-md: @md; // small containers and buttons
@padding-sm: @sm; // Form controls and items
@padding-xs: @xs; // small items
@padding-xss: @xss; // more small
```

### border-radius
```less
@square: 50%;
```
### line-height
```less
@base-line-height: 1;
```

### media
```less
// copy from ant-design
// Media queries breakpoints
// Extra small screen / phone
@screen-xs: 480px;
@screen-xs-min: @screen-xs;

// Small screen / tablet
@screen-sm: 576px;
@screen-sm-min: @screen-sm;

// Medium screen / desktop
@screen-md: 768px;
@screen-md-min: @screen-md;

// Large screen / wide desktop
@screen-lg: 992px;
@screen-lg-min: @screen-lg;

// Extra large screen / full hd
@screen-xl: 1200px;
@screen-xl-min: @screen-xl;

// Extra extra large screen / large desktop
@screen-xxl: 1600px;
@screen-xxl-min: @screen-xxl;

// provide a maximum
@screen-xs-max: (@screen-sm-min - 1px);
@screen-sm-max: (@screen-md-min - 1px);
@screen-md-max: (@screen-lg-min - 1px);
@screen-lg-max: (@screen-xl-min - 1px);
@screen-xl-max: (@screen-xxl-min - 1px);
```

