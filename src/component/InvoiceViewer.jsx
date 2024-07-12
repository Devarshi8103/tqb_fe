import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';




const InvoiceViewer = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const response = await axios.get(`https://tqb-be.onrender.com/invoice/${id}`);
        console.log("res data for url ", response.data.filePath);
        setPdfUrl(response.data.filePath);
      } catch (error) {
        console.error('Error fetching PDF URL:', error);
      }
    };

    fetchPdfUrl();
  }, [id]);



  return (
    <div className="invoice-viewer">
      
      {/* <div style={{ height: '750px' }}>
        <Worker workerUrl={workerSrc}>
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div> */}

{/* <PDFViewer
      document={{
        url: pdfUrl,
      }}  
    /> */}

<iframe
        src={pdfUrl}
        width="100%"
        height="750px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default InvoiceViewer;
