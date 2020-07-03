import React, { Fragment, useState } from 'react';
import axios from 'axios';

export const FileUpload = () => {
	const [file, setFile] = useState('');
	const [filename, setFilename] = useState('Choose File');
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/uploads`,
				formData,
				{
					headers: {
						'Content-type': 'multipart/form-data',
					},
				}
			);

			const { fileName, filePath } = res.data;

			setUploadedFile({ fileName, filePath });
		} catch (err) {
			console.log(err);
			if (err.response.status === 500) {
				console.error('There was a problem with the server');
			} else {
				console.log(err.response.data.message);
			}
		}
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className="custom-file mb-4">
					<input
						type="file"
						className="custom-file-input"
						id="customFile"
						onChange={onChange}
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{filename}
					</label>
				</div>

				<input
					type="submit"
					value="Upload"
					className="btn btn-primary btn-block mt-4"
				/>
			</form>
		</Fragment>
	);
};

export default FileUpload;
