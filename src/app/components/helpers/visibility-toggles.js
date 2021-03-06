import React from 'react';
import PropTypes from 'prop-types';

const VisibilityToggles = ({
    columns,
    onToggleColumn,
    isVisible,
    props = {
        container: {},
        label: {},
        value: {},
        toggle: {}
    }
}) => (
        <div
            className="visibility-container"
            {...props.container}
        >
            {columns.filter(column => column.header && column.header.label).map(
                (column, columnIndex) => {
                    const key = `visibility-toggle-${columnIndex}`;

                    return (
                        <li className="dropdown-item">
                            <label
                                className="visibility-label"
                                htmlFor={key}
                                {...props.label}
                                key={key}
                            >
                                <input
                                    className="visibility-toggle"
                                    type="checkbox"
                                    id={key}
                                    checked={isVisible({ column })}
                                    onChange={() => onToggleColumn({ column, columnIndex })}
                                    {...props.toggle}
                                />
                                <span
                                    className="visibility-value"
                                    {...props.value}
                                >
                                    {column.header.label}
                                </span>
                            </label>
                        </li>
                    );
                }
            )}
        </div>
    );
VisibilityToggles.propTypes = {
    /**
     * Example: \[
     *   {
     *     header: {
     *       label: 'Name'
     *     },
     *     visible: true
     *   },
     *   {
     *     header: {
     *       label: 'Age'
     *     },
     *     visible: false
     *   }
     * \]
     */
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggleColumn: PropTypes.func,
    isVisible: PropTypes.func,
    /**
     * Props attached to different parts of the component.
     */
    props: PropTypes.shape({
        container: PropTypes.object,
        label: PropTypes.object,
        value: PropTypes.object,
        toggle: PropTypes.object
    })
};
VisibilityToggles.defaultProps = {
    onToggleColumn: ({ column, columnIndex }) => { },
    isVisible: ({ column }) => column.visible
};

export default VisibilityToggles;