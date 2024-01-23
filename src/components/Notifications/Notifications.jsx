import React from 'react'
import EmptyDataNotifications from './EmptyDataNotifications'
import OldUpdateNotifications from './OldUpdateNotifications'

const Notifications = ({ recipes, ingredients }) => {
    return (
        <>
            <EmptyDataNotifications items={ingredients} title="Empty Data" onClick={() => console.log('Manage empty data')} />
            <EmptyDataNotifications items={recipes} title="Empty Data" onClick={() => console.log('Manage empty data')} />
            <OldUpdateNotifications items={ingredients} title="Old Updates" onClick={() => console.log('Manage old updates')} />
        </>
    )
}

export default Notifications