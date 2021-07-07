import { Colors } from '@/config/colors';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import Loader from 'react-loader-spinner';
import { Text } from 'components/text';
import { StyleFonts } from '@/config/fonts';

import { UPLOAD_API } from 'config/ipfs';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: copy;
  border-radius: 10px;
  border: dashed 2px ${Colors.Secondary};

  padding: 16px;
  margin: 16px;

  height: 30vh;
  max-width: 900px;
  width: 100%;

  background: ${Colors.Dark};

  @media (max-width: 400px) {
    width: 250px;
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

type Prop = {
  onUploaded: (hash: string) => void;
  title?: string;
};

const approvedImages = [
  `image/jpeg`,
  `image/webp`,
  `image/png`,
  `image/jpg`
];
export const Dropzone: React.FC<Prop> = ({ title, onUploaded }) => {
  const { t } = useTranslation(`explorer`);

  const [error, setError] = React.useState(``);
  const [loading, setLoading] = React.useState(false);

  const onDrop = React.useCallback(async([file]) => {
    setLoading(true);
    setError(``);
    const { type, size } = file;
    const mb = size / 1000000;

    if (mb > 2) {
      setError(t(`error_0`));
      setLoading(false);
      return null;
    }

    if (!approvedImages.includes(type)) {
      setError(t(`error_1`));
      setLoading(false);
      return null;
    }

    const formData = new FormData();
    formData.append(`file`, file);
    const options = {
      method: `POST`,
      body: formData
    };

    try {
      const res = await fetch(UPLOAD_API, options);
      const result = await res.json();

      onUploaded(result.Hash);
    } catch (err) {
      setError(t(`error_2`));
    }

    setLoading(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {error ? (
        <Text
          fontVariant={StyleFonts.Bold}
          fontColors={Colors.Danger}
          size="25px"
          css="text-align: center;"
        >
          {error}
        </Text>
      ) : loading ? (
        <LoadingContainer>
          <Loader
            type="Puff"
            color={Colors.Secondary}
            height={100}
            width={100}
          />
          <Text
            fontVariant={StyleFonts.Bold}
            size="25px"
            css="text-align: center;"
          >
            {t(`uploading`)}
          </Text>
        </LoadingContainer>
      ) : isDragActive ? (
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
          css="text-align: center;"
        >
          {t(`drop_file_here`)}
        </Text>
      ) : (
        <Text
          fontVariant={StyleFonts.Bold}
          size="25px"
          css="text-align: center;"
        >
          {title || t(`try_drop_file`)}
        </Text>
      )}
    </Container>
  );
};

export default Dropzone;
