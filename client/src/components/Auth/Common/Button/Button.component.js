import React from 'react'

export const Button = (props) => {
    const disabledLabel = props.disabledLabel || 'submitting...'
    const enabledLabel = props.enabledLabel || 'submit'

    let btn = props.isSubmitting
        ? <button disabled className='btn btn-info my-3'>{disabledLabel}...</button>
        : <button disabled={props.isDisabled} type='submit' className='btn btn-success my-3'>{enabledLabel}</button>

    return btn;
}