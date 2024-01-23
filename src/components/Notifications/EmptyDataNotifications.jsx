import React, { useEffect, useState } from 'react';

const EmptyDataNotifications = ({ items, title, onClick }) => {
    const [incompleteItemIds, setIncompleteItemIds] = useState([]);

    const findIncompleteItems = (items) => {
        const incompleteIds = [];
        items?.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if (item[key] === '') {
                    incompleteIds.push(item._id);
                }
            });
        });
        return incompleteIds;
    };

    useEffect(() => {
        if (items?.length > 0) {
            const incompleteIds = findIncompleteItems(items);
            setIncompleteItemIds(incompleteIds);
        }
    }, [items]);

    const handleOnClick = () => {
        console.log("mannage")
    }
    return (
        <>
            {incompleteItemIds.length > 0 && (
                <div className="card">
                    <h4>{title}</h4>
                    <p>We registered {incompleteItemIds.length} items with missing data</p>
                    <a onClick={onClick}>Manage</a>
                </div>
            )}
        </>
    );
};

export default EmptyDataNotifications;
