import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import PDFViewer from 'pdf-viewer-reactjs';

// Define workerSrc globally without importing pdfjs directly
const workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

const InvoiceViewer = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/invoice/${id}`);
        console.log("res data for url ", response.data.filePath);
        setPdfUrl(response.data.filePath);
      } catch (error) {
        console.error('Error fetching PDF URL:', error);
      }
    };

    fetchPdfUrl();
  }, [id]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
