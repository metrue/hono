import { normalizeIntrinsicElementProps, styleObjectForEach } from './utils'

describe('normalizeIntrinsicElementProps', () => {
  it('should convert className to class', () => {
    const props: Record<string, unknown> = {
      className: 'test-class',
      id: 'test-id',
    }

    normalizeIntrinsicElementProps(props)

    expect(props).toEqual({
      class: 'test-class',
      id: 'test-id',
    })
  })

  it('should convert htmlFor to for', () => {
    const props: Record<string, unknown> = {
      htmlFor: 'test-for',
      name: 'test-name',
    }

    normalizeIntrinsicElementProps(props)

    expect(props).toEqual({
      for: 'test-for',
      name: 'test-name',
    })
  })

  it('should convert multiple attribute aliases', () => {
    const props: Record<string, unknown> = {
      className: 'test-class',
      htmlFor: 'test-for',
      type: 'text',
    }

    normalizeIntrinsicElementProps(props)

    expect(props).toEqual({
      class: 'test-class',
      for: 'test-for',
      type: 'text',
    })
  })

  it('should not modify props without className or htmlFor', () => {
    const props: Record<string, unknown> = {
      id: 'test-id',
      name: 'test-name',
    }

    normalizeIntrinsicElementProps(props)

    expect(props).toEqual({
      id: 'test-id',
      name: 'test-name',
    })
  })

  it('should handle empty props', () => {
    const props: Record<string, unknown> = {}

    normalizeIntrinsicElementProps(props)

    expect(props).toEqual({})
  })
})

describe('styleObjectForEach', () => {
  describe('Should output the number as it is, when a number type is passed', () => {
    test.each`
      property
      ${'animationIterationCount'}
      ${'aspectRatio'}
      ${'borderImageOutset'}
      ${'borderImageSlice'}
      ${'borderImageWidth'}
      ${'columnCount'}
      ${'columns'}
      ${'flex'}
      ${'flexGrow'}
      ${'flexPositive'}
      ${'flexShrink'}
      ${'flexNegative'}
      ${'flexOrder'}
      ${'gridArea'}
      ${'gridRow'}
      ${'gridRowEnd'}
      ${'gridRowSpan'}
      ${'gridRowStart'}
      ${'gridColumn'}
      ${'gridColumnEnd'}
      ${'gridColumnSpan'}
      ${'gridColumnStart'}
      ${'fontWeight'}
      ${'lineClamp'}
      ${'lineHeight'}
      ${'opacity'}
      ${'order'}
      ${'orphans'}
      ${'scale'}
      ${'tabSize'}
      ${'widows'}
      ${'zIndex'}
      ${'zoom'}
      ${'fillOpacity'}
      ${'floodOpacity'}
      ${'stopOpacity'}
      ${'strokeDasharray'}
      ${'strokeDashoffset'}
      ${'strokeMiterlimit'}
      ${'strokeOpacity'}
      ${'strokeWidth'}
    `('$property', ({ property }) => {
      const fn = vi.fn()
      styleObjectForEach({ [property]: 1 }, fn)
      expect(fn).toBeCalledWith(
        property.replace(/[A-Z]/g, (m: string) => `-${m.toLowerCase()}`),
        '1'
      )
    })
  })
  describe('Should output with px suffix, when a number type is passed', () => {
    test.each`
      property
      ${'borderBottomWidth'}
      ${'borderLeftWidth'}
      ${'borderRightWidth'}
      ${'borderTopWidth'}
      ${'borderWidth'}
      ${'bottom'}
      ${'fontSize'}
      ${'height'}
      ${'left'}
      ${'margin'}
      ${'marginBottom'}
      ${'marginLeft'}
      ${'marginRight'}
      ${'marginTop'}
      ${'padding'}
      ${'paddingBottom'}
      ${'paddingLeft'}
      ${'paddingRight'}
      ${'paddingTop'}
      ${'right'}
      ${'top'}
      ${'width'}
    `('$property', ({ property }) => {
      const fn = vi.fn()
      styleObjectForEach({ [property]: 1 }, fn)
      expect(fn).toBeCalledWith(
        property.replace(/[A-Z]/g, (m: string) => `-${m.toLowerCase()}`),
        '1px'
      )
    })
  })
})
