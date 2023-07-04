/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import {
  Modal,
  Button as MuiButton,
  Box,
  Typography,
  Slider
} from '@mui/material';
import { Crop } from '@mui/icons-material';
import styled from '@emotion/styled';
import { randomCode } from '@/utils/helper';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { getCroppedImg } from '@/utils/cropImage';

const modalStyleCropImage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '400px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  padding: '1rem'
};

const CropperWrapper = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom:'90px'
};

const ImageCropFooter = {
  position: 'absolute',
  bottom: '0',
  height: '90px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingRight: '1rem'
};

const ImageCropFooterContent = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
};

const SliderWrapperContent = {
  marginLeft: '-10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
};

const FooterButtonWrapper = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  paddingRight: '1rem'
};

const SliderWrapper = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 padding-left: 1rem;
`;

interface CropperImageProps {
  open: boolean;
  onClose: () => void;
  image: string | null;
  setCropValue: (_val: Array<File>, _data: string) => void;
  ratio: number;
}

function CropperImage({ open, onClose, image, setCropValue, ratio }: CropperImageProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  const handleClose = () => {
    setCroppedAreaPixels(null);
    onClose();
  };

  const toDataUrl = (url) => {
    return fetch(url).then(res => res.blob()).then(
      blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
    );
  };

  const dataUrlToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type:mime });
  };

  const handleCroppedImage = useCallback(async () => {
    const nameFile = randomCode(5);
    try {
      const isCroppedImage: any = await getCroppedImg(image, croppedAreaPixels, 0);
      toDataUrl(isCroppedImage).then(dataUrl => {
        const fileData = dataUrlToFile(dataUrl, nameFile + '.png');
        setCropValue([fileData], isCroppedImage);
      });
      onClose();
    } catch (e) {
      return e;
    }
  }, [image, croppedAreaPixels]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted
    >
      <Box sx={modalStyleCropImage}>
        <Box sx={CropperWrapper}>
          <Cropper
            image={image || ''}
            crop={crop}
            zoom={zoom}
            aspect={ratio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>
        <Box sx={ImageCropFooter}>
          <Box sx={ImageCropFooterContent}>
            <SliderWrapper>
              <Typography sx={SliderWrapperContent}>
                <Crop sx={{ marginRight: '.5rem' }}/>Crop
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => setZoom(Number(zoom))}
                sx={{ width: '50%' }}
              />
            </SliderWrapper>
            <Box sx={FooterButtonWrapper}>
              <MuiButton variant='outlined' size='small' onClick={handleClose}>Cancel</MuiButton>
              <MuiButton variant='contained' size='small' color='primary' onClick={handleCroppedImage}>Save</MuiButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default CropperImage;