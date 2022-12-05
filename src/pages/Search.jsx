import React from "react"
import { useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import ProfileListItem from "../components/ProfileListItem"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Search() {
	const [searchInput, setSearchInput] = useState("")
	const [searchResults, setSearchResults] = useState([])

	const userCollectionRef = collection(db, "users")

	const handleSearch = (e) => {
		e.preventDefault()
		if (!searchInput) return

		setSearchResults([])

		const q = query(userCollectionRef, where("displayName", "==", searchInput))
		onSnapshot(q, (snapshot) => {
			setSearchResults(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			)
		})
	}

	return (
		<div className="search">
			<form
				className="search__input"
				onSubmit={handleSearch}
			>
				<input
					type="text"
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
				/>
				<button type="submit">Search</button>
			</form>
			<div className="search__results">
				{searchResults &&
					searchResults.map((item) => (
						<Link
							to={`/user/${item.uid}`}
							key={item.uid}
						>
							<ProfileListItem item={item} />
						</Link>
					))}
			</div>
		</div>
	)
}
