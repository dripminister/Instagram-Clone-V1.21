import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import ProfileListItem from "../components/ProfileListItem"

export default function Followers() {
	const { userId } = useParams()

	const [profile, setProfile] = useState(null)
	const [followers, setFollowers] = useState([])

	useEffect(() => {
		const getProfile = async () => {
			const docRef = doc(db, "users", userId)
			const docSnap = await getDoc(docRef)
			setProfile(docSnap.data())
		}

		getProfile()
	}, [])

	useEffect(() => {
		if (!profile) return
		setFollowers([])

		const getFollowers = () => {
			profile.followers.map(async (item) => {
				const docRef = doc(db, "users", item)
				const docSnap = await getDoc(docRef)
				setFollowers((prev) => [...prev, docSnap.data()])
			})
		}

		getFollowers()
	}, [profile])

	return (
		<div className="followers">
			<h1>{profile?.displayName} followers</h1>
			{followers ? (
				followers.map((item) => (
					<Link
						to={`/user/${item.uid}`}
						key={item.uid}
					>
						<ProfileListItem item={item}/>
					</Link>
				))
			) : (
				<h1>This user has no follower</h1>
			)}
		</div>
	)
}
