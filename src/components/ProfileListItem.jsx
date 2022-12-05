import React from 'react'

export default function ProfileListItem({item}) {
  return (
		<div className="profileListItem">
			<img
				src={
					item?.photoURL
						? item.photoURL
						: "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
				}
                alt="profile picture"
				className="profileListItem__Picture"
			/>
			{item.displayName}
		</div>
	)
}
