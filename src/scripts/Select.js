import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


export default class Select extends Component {
  constructor() {
    super();
    this.state = { id: `form-element-${uuid()}` };
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, ...props } = this.props;
    if (label || required || error) {
      const formElemProps = { id, label, required, error };
      return (
        <FormElement { ...formElemProps }>
          <Select { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, children, ...pprops } = props;
    delete pprops.onChange;
    const selectClassNames = classnames(className, 'slds-select');
    return (
      <select
        id={ id }
        className={ selectClassNames }
        onChange={ this.onChange.bind(this) }
        { ...pprops }
      >
        { children }
      </select>
    );
  }

}

Select.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  onChange: PropTypes.func,
};

export const Option = props => (
  <option { ...props } />
);
