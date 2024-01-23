import React, { useEffect, useState } from 'react';

const OldUpdateNotifications = ({ items, title, onClick }) => {
    const [oldUpdateItemIds, setOldUpdateItemIds] = useState([]);

    const findOldUpdateItems = (items) => {
        const oldUpdateIds = [];
        const currentDate = new Date();

        items?.forEach((item) => {
            const lastUpdate = new Date(item.updatedAt);
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

            if (lastUpdate < threeMonthsAgo) {
                oldUpdateIds.push(item._id);
            }
        });

        return oldUpdateIds;
    };

    useEffect(() => {
        if (items?.length > 0) {
            const oldUpdateIds = findOldUpdateItems(items);
            setOldUpdateItemIds(oldUpdateIds);
        }
    }, [items]);

    return (
        <>
            {oldUpdateItemIds.length > 0 && (
                <div className="card">
                    <h4>{title}</h4>
                    <p>We registered {oldUpdateItemIds.length} items with updates older than 3 months</p>
                    <a onClick={onClick}>Manage</a>
                </div>
            )}
        </>
    );
};

export default OldUpdateNotifications;
